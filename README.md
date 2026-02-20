# Caddy CLI

```
   ____          _     _          ____ _     ___ 
  | |   / _` |/ _` |/ _` | | | | | |   | |    | | 
  | |__| (_| | (_| | (_| | |_| | | |___| |___ | | 
   ____\__,_|\__,_|\__,_|\__, |  \____|_____|___|
                          |___/                   
```

<p align="center">
  <a href="https://github.com/dbelyaeff/caddy_cli/releases/latest">
    <img src="https://img.shields.io/github/v/release/dbelyaeff/caddy_cli?include_prereleases&style=flat-square" alt="Latest Release">
  </a>
  <a href="https://github.com/dbelyaeff/caddy_cli/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/dbelyaeff/caddy_cli?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/dbelyaeff/caddy_cli/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/dbelyaeff/caddy_cli/ci.yml?style=flat-square" alt="CI">
  </a>
</p>

> Modern CLI tool for managing Caddy web server configuration with Docker integration

## ✨ Features

- **Interactive TUI** - Beautiful terminal interface built with clack/prompts
- **Real-time Configuration** - Read and write directly to Caddyfile
- **Docker Integration** - Automatically detect containers in the `caddy` network
- **Smart Filtering** - Show only unassigned containers when adding new sites
- **Auto-reload** - Automatically reload Caddy after configuration changes
- **No Database** - Works directly with Caddyfile, no extra storage needed

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/dbelyaeff/caddy_cli.git
cd caddy_cli

# Install dependencies
bun install

# Run the application
bun run src/main.ts
```

## 📋 Requirements

- [Bun](https://bun.sh/) runtime
- [Docker](https://www.docker.com/) with running Caddy container
- Caddy container connected to `caddy` network
- Docker socket accessible

## 🎯 Usage

### First Launch

On first launch, the app will:
1. Show requirements (Caddy in Docker, network configuration)
2. Ask for path to Caddy folder (default: `../caddy`)
3. Parse existing Caddyfile and import all sites
4. Scan Docker for containers in `caddy` network

### Main Menu

```
┌─────────────────────────────────────┐
│  🖥️  api.example.com → directus:8055    │
│  🖥️  bot.example.com → telegram_bot_api    │
│  🖥️  comments.example.com → remark42      │
│  ...                                     │
├─────────────────────────────────────┤
│  ＋ Добавить сайт                     │
│  ↻ Перезагрузить Caddy               │
├─────────────────────────────────────┤
│  ✕ Выход                             │
└─────────────────────────────────────┘
```

### Site Management

- **View sites** - All sites displayed in main menu
- **Select site** - Click to see details and actions
- **Edit** - Change container assignment
- **Delete** - Remove site from configuration

## ⚙️ Configuration

### Path Settings

The app stores the Caddy path in memory during session. Default path: `../caddy`

### Docker Network

The app looks for containers in the `caddy` network. Make sure your containers are connected:

```yaml
# docker-compose.yml example
services:
  myapp:
    image: myapp:latest
    networks:
      - caddy

networks:
  caddy:
    external: true
```

## 🏗️ Development

```bash
# Install dependencies
bun install

# Run in development mode (with hot reload)
bun run dev

# Build for production
bun build --target=bun ./src/main.ts --outdir=dist
```

## 📁 Project Structure

```
caddy_cli/
├── src/
│   ├── main.ts        # Application entry point
│   ├── caddyfile.ts   # Caddyfile parser and generator
│   ├── docker.ts      # Docker API integration
│   ├── ui.ts          # Terminal UI components
│   └── banner.ts     # ASCII banner generator
├── package.json
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Caddy](https://caddyserver.com/) - The ultimate server with automatic HTTPS
- [Bun](https://bun.sh/) - Incredibly fast JavaScript runtime
- [Clack](https://github.com/natemoo-re/clack) - Beautiful TUI components

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/dbelyaeff">dbelyaeff</a>
</p>
