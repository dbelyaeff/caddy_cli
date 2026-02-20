# Agent Instructions - Caddy CLI Application

## О проекте

CLI-приложение на Bun.SH для управления веб-сервером Caddy, работающим в Docker-контейнере.

## Версия

1.0.0

## Требования

1. **Технологии**: Bun.SH + clack/prompts + figlet
2. **Функциональность**:
   - Показывать список сайтов из Caddyfile
   - Редактировать reverse_proxy (выбирать Docker контейнер)
   - Добавлять новые сайты с привязкой к контейнеру
   - 1 домен = 1 контейнер
   - Сохранять конфиг и перезагружать Caddy в Docker
3. **UI**: ASCII баннер "Caddy CLI" с объёмным 3D-шрифтом (figlet)

## Структура проекта

```
caddy_cli/
├── src/
│   ├── main.ts       # Точка входа
│   ├── caddyfile.ts # Парсинг и генерация Caddyfile
│   ├── docker.ts    # Docker API интеграция
│   ├── ui.ts        # TUI компоненты
│   └── banner.ts   # ASCII баннер (figlet)
├── package.json
├── tsconfig.json
├── README.md
├── CHANGELOG.md
├── agent.md
└── project.md
```

## Конфигурация

- Caddyfile: `../caddy/config/Caddyfile` (относительно caddy_cli)
- Docker socket: `/var/run/docker.sock`
- Caddy network: `caddy`

## Основная логика

### main.ts
- Инициализация приложения
- Главный цикл меню
- Обработка действий (добавление, редактирование, удаление, перезагрузка)

### caddyfile.ts
- `getSites()` - чтение сайтов из Caddyfile в реальном времени
- `saveSites(sites)` - сохранение сайтов в Caddyfile
- `parseCaddyfile()` - парсинг конфига
- `generateCaddyfile()` - генерация конфига
- НЕТ базы данных - всё работает напрямую с Caddyfile

### docker.ts
- `getAllContainers()` - получение контейнеров в сети caddy
- `reloadCaddy()` - перезагрузка Caddy через docker exec

### ui.ts
- Интерактивное меню с clack/prompts
- Выбор сайта, контейнера
- Подтверждения действий

## Парсинг Caddyfile

Блоки сайтов имеют формат:
```
domain.tld {
    import shared domain.tld
    reverse_proxy container_name:port
}
```

Извлекается:
- Домен (первая строка блока)
- Имя контейнера из reverse_proxy (до двоеточия)
- Порт (после двоеточия, если есть)

## Генерация Caddyfile

Шаблон для каждого сайта:
```
{domain} {
	import shared {domain}
	reverse_proxy {container_name}:{port}
}
```

Глобальные настройки (headers, encode и т.д.) сохраняются как есть.

## Версионирование

SemVer (MAJOR.MINOR.PATCH):
- MAJOR - Breaking changes
- MINOR - New features  
- PATCH - Bug fixes

## Публикация

1. Обновить версию в package.json
2. Обновить CHANGELOG.md
3. Коммит с тегом: `git tag v1.0.0`
4. Запушить: `git push --tags`
5. Создать Release на GitHub

## Установка бинарника

```bash
# Собрать
bun build --target=bun --outdir=dist src/main.ts

# Установить
sudo cp dist/main.js /usr/local/bin/caddy_cli
chmod +x /usr/local/bin/caddy_cli
```

## Важные замечания

1. Использовать `clack` (npm пакет `@clack/prompts`)
2. Контейнеры получать через Docker CLI
3. При первом запуске - импорт из существующего Caddyfile
4. Обрабатывать ошибки: файл не найден, контейнер не существует и т.д.
5. Цвета использовать через escape-последовательности
6. НЕТ базы данных - всё работает в реальном времени с Caddyfile
