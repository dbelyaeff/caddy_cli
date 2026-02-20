import figlet from "figlet";
import { existsSync } from "fs";
import { join } from "path";

function findFontPath(fontName: string): string | null {
  const possiblePaths = [
    "/usr/local/share/caddy_cli/fonts",
    join(process.cwd(), "node_modules", "figlet", "fonts"),
  ];
  
  for (const fontPath of possiblePaths) {
    const fontFile = join(fontPath, `${fontName}.flf`);
    if (existsSync(fontFile)) {
      return fontFile;
    }
  }
  return null;
}

export function printBanner(): void {
  const fontPath = findFontPath("ANSI Shadow");
  
  try {
    const banner = figlet.textSync("Caddy CLI", {
      font: "ANSI Shadow",
      fontFile: fontPath || undefined,
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true
    });
    console.log(banner);
  } catch {
    console.log(`
  ____          _     _          ____ _     ___ 
 | |   / _\` |/ _\` |/ _\` | | | | | |   | |    | | 
 | |__| (_| | (_| | (_| | |_| | | |___| |___ | | 
  \\____\\__,_|\\__,_|\\__,_|\\__, |  \\____|_____|___|
                          |___/                   
    `);
  }
}
