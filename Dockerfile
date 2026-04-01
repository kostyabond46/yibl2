# Використовуємо готовий образ з попередньо встановленим Chrome і Node.js
FROM ghcr.io/puppeteer/puppeteer:latest

# Перемикаємось на права root, щоб уникнути проблем з доступом
USER root

# Робоча директорія в контейнері
WORKDIR /app

# Копіюємо конфігурацію проекту
COPY package*.json ./

# Встановлюємо залежності (без завантаження другого Chromium)
RUN npm install

# Копіюємо всі інші файли проекту
COPY . .

# Вказуємо порт, який Render надає автоматично
ENV PORT=10000
EXPOSE 10000

# Команда для запуску бота
CMD ["node", "index.js"]
