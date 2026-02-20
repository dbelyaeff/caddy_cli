import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

export interface Site {
  domain: string;
  container_name: string;
  container_port: string;
}

let caddyBasePath: string = "../caddy";
let caddyPathLoaded: boolean = false;

export function setCaddyPath(path: string): void {
  caddyBasePath = path;
  caddyPathLoaded = true;
}

export function getCaddyPath(): string {
  return caddyBasePath;
}

export function getCaddyfilePath(): string {
  return `${caddyBasePath}/config/Caddyfile`;
}

export function parseCaddyfile(content: string): Site[] {
  const sites: Site[] = [];
  const lines = content.split("\n");
  
  let currentDomain = "";
  let inSiteBlock = false;
  let braceCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line || line.startsWith("#") || line.startsWith("//")) continue;
    
    if (line.startsWith("{") && !inSiteBlock) continue;
    if (line.startsWith("(")) continue;
    
    if (inSiteBlock) {
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      
      const reverseProxyMatch = line.match(/reverse_proxy\s+(?:\*\s+)?(\S+)(?::(\d+))?/);
      if (reverseProxyMatch) {
        sites.push({
          domain: currentDomain,
          container_name: reverseProxyMatch[1],
          container_port: reverseProxyMatch[2] || ""
        });
      }
      
      if (braceCount <= 0) {
        inSiteBlock = false;
        currentDomain = "";
        braceCount = 0;
      }
    } else {
      if (!line.includes("{") && !line.includes("}") && 
          !line.startsWith("import") && !line.startsWith("header") && 
          !line.startsWith("log") && !line.startsWith("encode") && 
          !line.startsWith("root") && !line.startsWith("file_server")) {
        currentDomain = line;
        inSiteBlock = true;
        braceCount = 1;
      } else if (line.includes("{")) {
        currentDomain = line.replace("{", "").trim();
        inSiteBlock = true;
        braceCount = 1;
      }
    }
  }
  
  return sites;
}

export async function readCaddyfile(): Promise<string> {
  const path = getCaddyfilePath();
  
  if (!existsSync(path)) {
    throw new Error(`Caddyfile not found at ${path}`);
  }
  
  return readFile(path, "utf-8");
}

export async function getSites(): Promise<Site[]> {
  const content = await readCaddyfile();
  return parseCaddyfile(content);
}

export function generateCaddyfile(sites: Site[], existingContent: string): string {
  const globalBlocks = extractGlobalBlocks(existingContent);
  const hasSharedSnippets = globalBlocks.sharedBlocks.includes("(shared)");
  
  let result = "";
  
  result += globalBlocks.global + "\n";
  
  if (hasSharedSnippets) {
    result += globalBlocks.sharedBlocks + "\n";
    result += globalBlocks.mustHeadersBlock + "\n\n";
  }
  
  for (const site of sites) {
    const port = site.container_port && site.container_port !== "80" ? `:${site.container_port}` : "";
    result += `${site.domain} {\n`;
    if (hasSharedSnippets) {
      result += `\timport shared ${site.domain}\n`;
    } else {
      result += `\tencode zstd gzip\n`;
    }
    result += `\treverse_proxy ${site.container_name}${port}\n`;
    result += `}\n\n`;
  }
  
  return result;
}

function extractGlobalBlocks(content: string): { global: string; sharedBlocks: string; mustHeadersBlock: string } {
  const lines = content.split("\n");
  
  let global = "";
  let sharedBlocks = "";
  let mustHeadersBlock = "";
  
  let inGlobalBlock = false;
  let inSharedBlock = false;
  let braceCount = 0;
  let currentBlock = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith("{") && !inGlobalBlock && !inSharedBlock && trimmed === "{") {
      inGlobalBlock = true;
      braceCount = 1;
      currentBlock = "global";
      global = line + "\n";
      continue;
    }
    
    if (inGlobalBlock) {
      global += line + "\n";
      braceCount += (trimmed.match(/{/g) || []).length;
      braceCount -= (trimmed.match(/}/g) || []).length;
      
      if (braceCount <= 0) {
        inGlobalBlock = false;
      }
      continue;
    }
    
    if (trimmed.startsWith("(shared)")) {
      inSharedBlock = true;
      braceCount = 1;
      currentBlock = "sharedBlocks";
      sharedBlocks = "";
      continue;
    }
    
    if (trimmed.startsWith("(mustheaders)")) {
      inSharedBlock = true;
      braceCount = 1;
      currentBlock = "mustHeadersBlock";
      mustHeadersBlock = "";
      continue;
    }
    
    if (inSharedBlock) {
      if (currentBlock === "sharedBlocks") {
        sharedBlocks += line + "\n";
      } else {
        mustHeadersBlock += line + "\n";
      }
      
      braceCount += (trimmed.match(/{/g) || []).length;
      braceCount -= (trimmed.match(/}/g) || []).length;
      
      if (braceCount <= 0) {
        inSharedBlock = false;
      }
      continue;
    }
  }
  
  return { global, sharedBlocks, mustHeadersBlock };
}

export async function saveSites(sites: Site[]): Promise<void> {
  const content = await readCaddyfile();
  const newContent = generateCaddyfile(sites, content);
  await writeCaddyfile(newContent);
}

export async function writeCaddyfile(content: string): Promise<void> {
  const path = getCaddyfilePath();
  await writeFile(path, content, "utf-8");
}
