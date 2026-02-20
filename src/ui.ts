import { 
  select, 
  confirm, 
  text 
} from "@clack/prompts";
import type { Site } from "./caddyfile";
import type { DockerContainer } from "./docker";

const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

export type Action = "list" | "add" | "edit" | "edit_port" | "delete" | "reload" | "quit" | "back" | "site";

export interface SiteWithAction extends Site {
  action: "edit" | "delete" | "back";
}

export async function showMainMenu(sites: Site[]): Promise<{ action: Action; site?: Site }> {
  const options: { value: string; label: string }[] = [];

  if (sites.length > 0) {
    for (const site of sites) {
      const portDisplay = site.container_port && site.container_port !== "80" ? `:${site.container_port}` : "";
      options.push({
        value: `site:${site.domain}`,
        label: `${cyan(site.domain)} → ${site.container_name}${portDisplay}`
      });
    }
    options.push({ value: "divider1", label: dim("─".repeat(30)) });
  }

  options.push(
    { value: "add", label: green("＋") + " Добавить сайт" },
    { value: "reload", label: yellow("↻") + " Перезагрузить Caddy" }
  );

  options.push({ value: "divider2", label: dim("─".repeat(30)) });
  options.push({ value: "quit", label: red("✕") + " Выход" });

  const choice = await select({
    message: "Главное меню:",
    options
  });

  if (!choice || choice === "quit") {
    return { action: "quit" };
  }

  if (choice === "add") {
    return { action: "add" };
  }

  if (choice === "reload") {
    return { action: "reload" };
  }

  if (typeof choice === "string" && choice.startsWith("site:")) {
    const domain = choice.replace("site:", "");
    const site = sites.find(s => s.domain === domain);
    return { action: "site", site };
  }

  return { action: "quit" };
}

export async function showSiteMenu(site: Site): Promise<{ action: Action; site?: Site }> {
  const portDisplay = site.container_port && site.container_port !== "80" ? site.container_port : "не указан";

  console.log(`
${bold("═".repeat(50))}
${bold("  Информация о сайте  ".padEnd(50, "═"))}
${bold("═".repeat(50))}

  ${bold("Домен:")} ${cyan(site.domain)}
  ${bold("Контейнер:")} ${site.container_name}
  ${bold("Порт:")} ${portDisplay}

${bold("═".repeat(50))}
  `);

  const choice = await select({
    message: `Действия с ${site.domain}:`,
    options: [
      { value: "edit", label: green("✎") + " Изменить контейнер" },
      { value: "edit_port", label: yellow("⚙") + " Изменить порт" },
      { value: "delete", label: red("✕") + " Удалить сайт" },
      { value: "divider", label: dim("─".repeat(30)) },
      { value: "back", label: "← Назад" }
    ]
  });

  if (!choice || choice === "back") {
    return { action: "back" };
  }

  if (choice === "edit") {
    return { action: "edit", site };
  }

  if (choice === "edit_port") {
    return { action: "edit_port" as Action, site };
  }

  if (choice === "delete") {
    return { action: "delete", site };
  }

  return { action: "back" };
}

function getUsedContainers(sites: Site[]): Set<string> {
  return new Set(sites.map(s => s.container_name));
}

export async function selectContainer(containers: DockerContainer[], sites: Site[]): Promise<{ name: string; port: string } | null> {
  const usedContainers = getUsedContainers(sites);
  
  const availableContainers = containers.filter(c => !usedContainers.has(c.name));
  
  const choices: { value: string; label: string }[] = [];
  
  if (availableContainers.length > 0) {
    for (const c of availableContainers) {
      const portsStr = c.ports.length > 0 ? c.ports.join(", ") : "порт по умолчанию";
      choices.push({
        value: `${c.name}:${c.ports[0] || ""}`,
        label: `${c.name} (${portsStr})`
      });
    }
    choices.push({ value: "divider", label: dim("─".repeat(30)) });
  }
  
  if (containers.length === 0) {
    console.log(red("Нет доступных контейнеров в сети caddy."));
    return null;
  }
  
  if (availableContainers.length === 0) {
    console.log(yellow("Все контейнеры уже привязаны к сайтам."));
    return null;
  }
  
  choices.push({ value: "back", label: "← Назад" });

  const selected = await select({
    message: "Выберите контейнер:",
    options: choices
  });

  if (!selected || typeof selected !== "string" || selected === "back") return null;
  
  const [name, port] = selected.split(":");
  
  return {
    name,
    port: port || "80"
  };
}

export async function askPort(currentPort?: string): Promise<string | null> {
  const port = await text({
    message: "Введите порт контейнера (оставьте пустым для порта по умолчанию):",
    placeholder: currentPort || "",
    initialValue: currentPort || "",
    validate: (value) => {
      if (value && !/^\d+$/.test(value)) {
        return "Порт должен быть числом";
      }
      if (value) {
        const portNum = parseInt(value, 10);
        if (portNum < 1 || portNum > 65535) {
          return "Порт должен быть от 1 до 65535";
        }
      }
      return undefined;
    }
  });

  if (port === null || typeof port !== "string") return null;
  return port;
}

export async function askDomain(): Promise<string | null> {
  const domain = await text({
    message: "Введите домен (например: example.com):",
    placeholder: "example.com",
    validate: (value) => {
      if (!value.includes(".")) {
        return "Домен должен содержать точку";
      }
      return undefined;
    }
  });

  if (!domain || typeof domain !== "string") return null;
  return domain;
}

export async function confirmAction(message: string): Promise<boolean> {
  const confirmed = await confirm({
    message
  });
  
  return confirmed as boolean;
}

export function printSuccess(message: string): void {
  console.log(green(`✓ ${message}`));
}

export function printError(message: string): void {
  console.log(red(`✗ ${message}`));
}

export function printInfo(message: string): void {
  console.log(cyan(`ℹ ${message}`));
}
