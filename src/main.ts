#!/usr/bin/env bun

import { existsSync } from "fs";
import { getAllContainers, reloadCaddy, type DockerContainer } from "./docker";
import { 
  getSites, 
  saveSites, 
  setCaddyPath, 
  getCaddyPath, 
  getCaddyfilePath,
  type Site
} from "./caddyfile";
import { loadConfig, saveConfig } from "./config";
import { printBanner } from "./banner";
import { 
  showMainMenu, 
  showSiteMenu,
  selectContainer, 
  askDomain, 
  confirmAction,
  printSuccess,
  printError,
  printInfo,
  type Action
} from "./ui";

let containers: DockerContainer[] = [];

async function setupCaddyPath(): Promise<boolean> {
  const savedConfig = await loadConfig();
  
  if (savedConfig?.caddyPath) {
    setCaddyPath(savedConfig.caddyPath);
    const caddyfilePath = getCaddyfilePath();
    
    if (existsSync(caddyfilePath)) {
      printSuccess(`Используется сохранённый путь: ${savedConfig.caddyPath}`);
      return true;
    }
    
    printInfo(`Сохранённый путь недействителен: ${savedConfig.caddyPath}`);
  }
  
  console.log("");
  console.log(`
┌─────────────────────────────────────────────────────────┐
│                    ВАЖНАЯ ИНФОРМАЦИЯ                     │
├─────────────────────────────────────────────────────────┤
│  Для работы приложения требуется:                        │
│                                                         │
│  1. Caddy должен быть запущен в Docker-контейнере      │
│  2. Контейнеры должны быть в сети "caddy"               │
│  3. Docker сокет должен быть доступен                  │
└─────────────────────────────────────────────────────────┘
  `);
  
  console.log("");
  printInfo("Необходимо указать путь к папке с Caddy");
  
  const defaultPath = "../caddy";
  const { text } = await import("@clack/prompts");
  
  const pathInput = await text({
    message: "Введите путь к папке с Caddy:",
    placeholder: defaultPath,
    initialValue: defaultPath
  });
  
  const caddyPath = (typeof pathInput === "string" ? pathInput : defaultPath) || defaultPath;
  setCaddyPath(caddyPath);
  
  const caddyfilePath = getCaddyfilePath();
  if (!existsSync(caddyfilePath)) {
    printError(`Caddyfile не найден по пути: ${caddyfilePath}`);
    return false;
  }
  
  await saveConfig({ caddyPath });
  printSuccess(`Путь сохранён: ${caddyPath}`);
  return true;
}

async function saveAndReload(sites: Site[]): Promise<boolean> {
  try {
    await saveSites(sites);
    printSuccess("Caddyfile сохранён");
    
    printInfo("Перезагрузка Caddy...");
    const reloaded = await reloadCaddy();
    
    if (reloaded) {
      printSuccess("Caddy перезагружен");
      return true;
    } else {
      printError("Не удалось перезагрузить Caddy");
      return false;
    }
  } catch (error) {
    printError(`Ошибка при сохранении: ${error}`);
    return false;
  }
}

async function handleAdd(currentSites: Site[]): Promise<Site[]> {
  const domain = await askDomain();
  if (!domain) return currentSites;
  
  const existingSite = currentSites.find(s => s.domain === domain);
  if (existingSite) {
    printError(`Сайт ${domain} уже существует`);
    return currentSites;
  }
  
  const container = await selectContainer(containers, currentSites);
  if (!container) return currentSites;
  
  const confirmed = await confirmAction(`Добавить сайт ${domain} → ${container.name}:${container.port}?`);
  if (!confirmed) return currentSites;
  
  const newSite: Site = {
    domain,
    container_name: container.name,
    container_port: container.port
  };
  
  const newSites = [...currentSites, newSite];
  printSuccess(`Сайт ${domain} добавлен`);
  
  const save = await confirmAction("Сохранить конфиг и перезагрузить Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  
  return newSites;
}

async function handleEdit(site: Site, currentSites: Site[]): Promise<Site[]> {
  printInfo(`Текущая конфигурация: ${site.domain} → ${site.container_name}:${site.container_port || "80"}`);
  
  const container = await selectContainer(containers, currentSites);
  if (!container) return currentSites;
  
  const confirmed = await confirmAction(`Изменить контейнер на ${container.name}:${container.port}?`);
  if (!confirmed) return currentSites;
  
  const newSites = currentSites.map(s => 
    s.domain === site.domain 
      ? { ...s, container_name: container.name, container_port: container.port }
      : s
  );
  
  printSuccess(`Сайт ${site.domain} обновлён`);
  
  const save = await confirmAction("Сохранить конфиг и перезагрузить Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  
  return newSites;
}

async function handleDelete(site: Site, currentSites: Site[]): Promise<Site[]> {
  const confirmed = await confirmAction(`Удалить сайт ${site.domain}?`);
  if (!confirmed) return currentSites;
  
  const newSites = currentSites.filter(s => s.domain !== site.domain);
  printSuccess(`Сайт ${site.domain} удалён`);
  
  const save = await confirmAction("Сохранить конфиг и перезагрузить Caddy?");
  if (save) {
    await saveAndReload(newSites);
  }
  
  return newSites;
}

async function handleReload(): Promise<boolean> {
  const confirmed = await confirmAction("Перезагрузить Caddy?");
  if (!confirmed) return false;
  
  const sites = await getSites();
  return await saveAndReload(sites);
}

async function main(): Promise<void> {
  printBanner();
  
  const caddyReady = await setupCaddyPath();
  if (!caddyReady) {
    printError("Не удалось настроить путь к Caddy. Выход.");
    process.exit(1);
  }
  
  containers = await getAllContainers();
  
  if (containers.length === 0) {
    printInfo("Контейнеры не найдены. При добавлении сайта можно ввести имя контейнера вручную.");
  } else {
    printSuccess(`Найдено ${containers.length} контейнеров в сети caddy`);
  }
  
  console.log("");
  
  let sites = await getSites();
  
  while (true) {
    const result = await showMainMenu(sites);
    
    switch (result.action) {
      case "add":
        sites = await handleAdd(sites);
        break;
        
      case "site":
        if (result.site) {
          while (true) {
            const siteResult = await showSiteMenu(result.site);
            
            if (siteResult.action === "back") {
              sites = await getSites();
              break;
            }
            
            if (siteResult.action === "edit") {
              sites = await handleEdit(result.site, sites);
            }
            
            if (siteResult.action === "delete") {
              sites = await handleDelete(result.site, sites);
              break;
            }
          }
        }
        break;
        
      case "reload":
        await handleReload();
        break;
        
      case "quit":
        printInfo("До свидания!");
        process.exit(0);
    }
  }
}

main().catch((error) => {
  printError(`Критическая ошибка: ${error}`);
  process.exit(1);
});
