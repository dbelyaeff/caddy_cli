# Caddy CLI

```
 ██████╗ █████╗ ██████╗ ██████╗ ██╗   ██╗     ██████╗██╗     ██╗
██╔════╝██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝██║     ██║
██║     ███████║██║  ██║██║  ██║ ╚████╔╝     ██║     ██║     ██║
██║     ██╔══██║██║  ██║██║  ██║  ╚██╔╝      ██║     ██║     ██║
╚██████╗██║  ██║██████╔╝██████╔╝   ██╗       ╚██████╗███████╗██║
 ╚═════╝╚═╝  ╚═╝╚═════╝ ╚═════╝    ╚═╝        ╚═════╝╚══════╝╚═╝

```

> Современный CLI-инструмент для управления конфигурацией веб-сервера Caddy с интеграцией Docker

## Возможности

- **Интерактивный интерфейс** - Красивый терминальный интерфейс на базе clack/prompts
- **Работа с Caddyfile** - Чтение и запись напрямую в Caddyfile
- **Интеграция с Docker** - Автоматическое определение контейнеров в сети `caddy`
- **Умная фильтрация** - Показывать только неиспользуемые контейнеры при добавлении сайтов
- **Автоперезагрузка** - Автоматическая перезагрузка Caddy после изменений конфигурации

## Требования

- [Bun](https://bun.sh/) - Runtime
- [Docker](https://www.docker.com/) - Docker должен быть установлен и запущен
- Docker Compose - Для запуска Caddy в контейнере

## Установка

```bash
# Клонировать репозиторий
git clone https://github.com/dbelyaeff/caddy_cli.git
cd caddy_cli

# Установить зависимости
bun install

# Собрать бинарник
bun build --target=bun ./src/main.ts --outdir=dist

# Установить в систему
sudo cp dist/main.js /usr/local/bin/caddy-cli
sudo chmod +x /usr/local/bin/caddy-cli
```

## Быстрый старт

```bash
# Запуск приложения
caddy-cli
```

### Первый запуск

При первом запуске приложение:

1. Проверит наличие Docker
2. Создаст сеть `caddy` в Docker (если её нет)
3. Создаст файлы конфигурации Caddy (docker-compose.yml и Caddyfile) в указанной папке
4. Спросит путь к папке с Caddy (по умолчанию: `../caddy`)

### Главное меню

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

## Как добавить сайт

### Шаг 1: Запустите Caddy

Перейдите в папку с Caddy и запустите контейнеры:

```bash
cd ../caddy
docker-compose up -d
```

### Шаг 2: Подключите ваш сервис к сети Caddy

Ваш Docker-контейнер должен быть в сети `caddy`. Добавьте в ваш `docker-compose.yml`:

```yaml
services:
  myapp:
    image: myapp:latest
    networks:
      - caddy

networks:
  caddy:
    external: true
    name: caddy
```

Затем перезапустите контейнеры:

```bash
docker-compose up -d
```

### Шаг 3: Добавьте сайт через CLI

```bash
caddy-cli
```

В меню выберите "Добавить сайт", введите домен и выберите контейнер из списка.

## Конфигурация

### Пути

Приложение сохраняет путь к папке Caddy в `~/.caddy-cli/config.json`.

По умолчанию:
- Caddyfile: `./caddy/config/Caddyfile`
- Docker socket: `/var/run/docker.sock`

### Сеть Caddy

Приложение ищет контейнеры в сети `caddy`. Убедитесь, что ваши контейнеры подключены к этой сети.

## Структура проекта

```
caddy_cli/
├── src/
│   ├── main.ts        # Точка входа
│   ├── caddyfile.ts   # Парсинг и генерация Caddyfile
│   ├── config.ts      # Управление конфигурацией
│   ├── docker.ts      # Интеграция с Docker API
│   ├── ui.ts          # Компоненты интерфейса
│   ├── banner.ts      # ASCII баннер
│   └── setup.ts       # Проверка и настройка системы
├── templates/
│   ├── docker-compose.yml  # Шаблон для запуска Caddy
│   └── Caddyfile           # Базовый конфиг Caddy
├── package.json
└── tsconfig.json
```

## Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)

---

Сделано с ❤️ от [dbelyaeff](https://github.com/dbelyaeff)
