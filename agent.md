# Agent Instructions - Caddy CLI Application

## Задача

Создать CLI-приложение на Bun.SH для управления веб-сервером Caddy.

## Требования

1. **Технологии**: Bun.SH + SQLite (встроенный в Bun) + clack/prompts
2. **Функциональность**:
   - Показывать список сайтов из Caddy
   - Редактировать reverse_proxy (выбирать Docker контейнер)
   - Добавлять новые сайты с привязкой к контейнеру
   - 1 домен = 1 контейнер
   - Сохранять конфиг и перезагружать Caddy в Docker
3. **UI**: ASCII баннер "Caddy UI" с объёмным 3D-шрифтом

## Структура проекта

```
caddy_cli/
├── src/
│   ├── main.ts          # Точка входа
│   ├── db.ts            # SQLite база данных
│   ├── caddyfile.ts     # Парсинг и генерация Caddyfile
│   ├── docker.ts        # Работа с Docker API
│   ├── ui.ts            # CLI интерфейс (clack/prompts)
│   └── banner.ts        # ASCII баннер
├── data/
│   └── caddy_cli.db     # SQLite база данных
├── package.json
└── tsconfig.json
```

## Конфигурация

- Caddyfile: `../caddy/config/Caddyfile` (относительно caddy_cli)
- Docker socket: `/var/run/docker.sock`
- Caddy network: `caddy`

## Реализация

### 1. main.ts
- Инициализация базы данных
- Вывод баннера
- Главное меню с выбором действий

### 2. db.ts
- Создание таблицы sites при первом запуске
- Методы: getAllSites, addSite, updateSite, deleteSite, getSiteByDomain

### 3. caddyfile.ts
- Чтение текущего Caddyfile
- Парсинг доменов и reverse_proxy
- Генерация нового Caddyfile на основе данных из БД
- Сохранение в `../caddy/config/Caddyfile`

### 4. docker.ts
- Получение списка контейнеров в сети `caddy`
- Возврат массива: { name, ip, ports }

### 5. ui.ts
- Использование clack/prompts для TUI
- Меню выбора действия
- Формы для добавления/редактирования

### 6. banner.ts
- ASCII art баннер "Caddy UI" с 3D эффектом

## Парсинг Caddyfile

Блоки сайтов имеют формат:
```
domain.tld {
    import shared domain.tld
    reverse_proxy container_name:port
}
```

Нужно извлекать:
- Домен (первая строка блока)
- Имя контейнера из reverse_proxy (до двоеточия)
- Порт (после двоеточия, если есть)

## Генерация Caddyfile

Шаблон для каждого сайта:
```
{domain} {
	import shared {domain}
	reverse_proxy {container_name}{port}
}
```

Глобальные настройки (headers, encode и т.д.) сохранять как есть.

## Перезагрузка Caddy

После сохранения Caddyfile выполнить:
```bash
docker exec caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```
или
```bash
docker-compose -f ../caddy/docker-compose.yml exec caddy caddy reload
```

## Важные замечания

1. Использовать `clack` (npm пакет `@clack/prompts`) - это форк prompts с улучшениями
2. Контейнеры получать через Docker socket (`/var/run/docker.sock`)
3. При первом запуске - предложить импорт из существующего Caddyfile
4. Обрабатывать ошибки: файл не найден, контейнер не существует и т.д.
5. Цвета использовать через `clack` (colors встроены)
