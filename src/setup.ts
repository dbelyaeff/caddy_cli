import { existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = join(__dirname, "..", "templates");

export interface CheckResult {
  name: string;
  status: "pending" | "success" | "error" | "info";
  message: string;
}

function printCheck(result: CheckResult): void {
  const icon = result.status === "success" ? "✅" : result.status === "error" ? "❌" : result.status === "info" ? "ℹ️" : "⏳";
  console.log(`${icon} ${result.name}: ${result.message}`);
}

export async function checkDockerInstalled(): Promise<CheckResult> {
  try {
    const proc = spawn("docker", ["--version"], { stdio: "pipe" });
    await new Promise<void>((resolve) => {
      proc.on("close", () => resolve());
    });
    
    if (proc.exitCode === 0) {
      return { name: "Docker", status: "success", message: "Docker установлен" };
    } else {
      return { name: "Docker", status: "error", message: "Docker не установлен" };
    }
  } catch {
    return { name: "Docker", status: "error", message: "Docker не установлен" };
  }
}

export async function ensureCaddyNetwork(): Promise<CheckResult> {
  try {
    const proc = spawn("docker", ["network", "ls", "--format", "{{.Name}}"], { stdio: "pipe" });
    const stdout = await new Promise<string>((resolve) => {
      let output = "";
      proc.stdout.on("data", (data) => { output += data.toString(); });
      proc.on("close", () => resolve(output));
    });
    
    if (stdout.includes("caddy")) {
      return { name: "Сеть caddy", status: "success", message: "Сеть уже существует" };
    }
    
    const createProc = spawn("docker", ["network", "create", "caddy"], { stdio: "pipe" });
    await new Promise<void>((resolve) => {
      createProc.on("close", () => resolve());
    });
    
    if (createProc.exitCode === 0) {
      return { name: "Сеть caddy", status: "success", message: "Сеть создана" };
    } else {
      return { name: "Сеть caddy", status: "error", message: "Не удалось создать сеть" };
    }
  } catch (error) {
    return { name: "Сеть caddy", status: "error", message: `Ошибка: ${error}` };
  }
}

export function checkCaddyFiles(caddyPath: string): { dockerCompose: boolean; caddyfile: boolean } {
  const dockerComposePath = join(caddyPath, "docker-compose.yml");
  const configDir = join(caddyPath, "config");
  const caddyfilePath = join(configDir, "Caddyfile");
  
  return {
    dockerCompose: existsSync(dockerComposePath),
    caddyfile: existsSync(caddyfilePath)
  };
}

export async function setupCaddyFiles(caddyPath: string): Promise<CheckResult> {
  try {
    const configDir = join(caddyPath, "config");
    const dataDir = join(caddyPath, "data");
    
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }
    
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    const dockerComposePath = join(caddyPath, "docker-compose.yml");
    const caddyfilePath = join(configDir, "Caddyfile");
    
    if (!existsSync(dockerComposePath)) {
      copyFileSync(join(TEMPLATES_DIR, "docker-compose.yml"), dockerComposePath);
    }
    
    if (!existsSync(caddyfilePath)) {
      copyFileSync(join(TEMPLATES_DIR, "Caddyfile"), caddyfilePath);
    }
    
    return { name: "Файлы Caddy", status: "success", message: "Конфигурация создана" };
  } catch (error) {
    return { name: "Файлы Caddy", status: "error", message: `Ошибка: ${error}` };
  }
}

export async function runSystemCheck(caddyPath: string): Promise<void> {
  console.log("");
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║                    НАСТРОЙКА СИСТЕМЫ                        ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");
  console.log("");
  
  printCheck({ name: "Проверка", status: "info", message: "Начинаем проверку системы..." });
  console.log("");
  
  const dockerCheck = await checkDockerInstalled();
  printCheck(dockerCheck);
  
  if (dockerCheck.status === "error") {
    console.log("");
    console.log("❌ Для работы программы требуется Docker.");
    console.log("   Установите Docker: https://docs.docker.com/engine/install/");
    console.log("");
    process.exit(1);
  }
  
  const networkCheck = await ensureCaddyNetwork();
  printCheck(networkCheck);
  console.log("");
  
  const filesCheck = checkCaddyFiles(caddyPath);
  
  if (!filesCheck.dockerCompose || !filesCheck.caddyfile) {
    printCheck({ name: "Конфигурация", status: "info", message: "Создаем файлы конфигурации..." });
    console.log("");
    
    const setupResult = await setupCaddyFiles(caddyPath);
    printCheck(setupResult);
    console.log("");
    
    console.log("ℹ️  Файлы созданы по пути: " + caddyPath);
    console.log("   Вы можете запустить Caddy: cd " + caddyPath + " && docker-compose up -d");
    console.log("");
  } else {
    printCheck({ name: "Файлы Caddy", status: "success", message: "Конфигурация уже существует" });
    console.log("");
  }
  
  console.log("✅ Настройка завершена! Можно продолжать работу.");
  console.log("");
}
