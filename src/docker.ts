export interface DockerContainer {
  name: string;
  ip: string;
  ports: string[];
}

async function runDockerCommand(args: string[]): Promise<string> {
  try {
    const proc = Bun.spawn(["docker", ...args]);
    const output = await new Response(proc.stdout).text();
    await proc.exited;
    const exitCode = proc.exitCode;
    
    if (exitCode !== 0) {
      return "";
    }
    
    return output;
  } catch {
    return "";
  }
}

export async function getContainersInNetwork(networkName: string): Promise<DockerContainer[]> {
  try {
    const output = await runDockerCommand([
      "network", "inspect", networkName, 
      "--format", "{{range .Containers}}{{.Name}}|{{.IPv4Address}}|{{end}}"
    ]);
    
    if (!output.trim()) {
      return [];
    }
    
    const containers: DockerContainer[] = [];
    const entries = output.trim().split("\n");
    
    for (const entry of entries) {
      const [name, ip] = entry.split("|");
      if (!name || !ip) continue;
      
      const cleanName = name.startsWith("/") ? name.slice(1) : name;
      const cleanIp = ip.split("/")[0];
      
      if (cleanName.includes("caddy")) continue;
      
      containers.push({
        name: cleanName,
        ip: cleanIp,
        ports: []
      });
    }
    
    return containers;
  } catch {
    return [];
  }
}

export async function getAllContainers(): Promise<DockerContainer[]> {
  try {
    const output = await runDockerCommand([
      "ps", "--filter", "network=caddy", "--format", "{{.Names}}"
    ]);
    
    if (!output.trim()) {
      return [];
    }
    
    const containers: DockerContainer[] = [];
    const containerNames = output.trim().split("\n");
    
    for (const containerName of containerNames) {
      const name = containerName.trim();
      if (!name || name.includes("caddy")) continue;
      
      const inspectOutput = await runDockerCommand([
        "inspect", name, "--format", "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"
      ]);
      
      const ip = inspectOutput.trim();
      if (!ip) continue;
      
      const portsJson = await runDockerCommand([
        "inspect", name, "--format", "{{json .NetworkSettings.Ports}}"
      ]);
      
      const portsObj = JSON.parse(portsJson || "{}");
      const ports: string[] = [];
      
      for (const [containerPort, bindings] of Object.entries(portsObj)) {
        if (bindings && Array.isArray(bindings) && bindings.length > 0) {
          ports.push(containerPort.split("/")[0]);
        }
      }
      
      containers.push({
        name,
        ip,
        ports
      });
    }
    
    return containers;
  } catch {
    return [];
  }
}

export async function reloadCaddy(): Promise<boolean> {
  try {
    const output = await runDockerCommand([
      "ps", "--filter", "name=caddy", "--filter", "status=running", "--format", "{{.Names}}"
    ]);
    
    const containerName = output.trim().split("\n")[0];
    
    if (!containerName) {
      return false;
    }
    
    const proc = Bun.spawn(["docker", "exec", containerName, "caddy", "reload", "--config", "/etc/caddy/Caddyfile"]);
    await proc.exited;
    const exitCode = proc.exitCode;
    
    return exitCode === 0;
  } catch {
    return false;
  }
}
