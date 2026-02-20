# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-20

### Added
- Initial release
- Interactive TUI built with clack/prompts
- Real-time Caddyfile parsing and generation
- Docker container detection in `caddy` network
- Site management (add, edit, delete)
- Container port detection
- Auto-reload Caddy after configuration changes
- ASCII banner with figlet
- Smart filtering - show only unassigned containers

### Features
- No database required - works directly with Caddyfile
- Beautiful terminal interface with colors
- Site selection by domain name
- Confirmation dialogs for destructive actions

### Requirements
- Bun runtime
- Docker with running Caddy container
- Caddy container in `caddy` network
