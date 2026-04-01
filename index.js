const puppeteer = require('puppeteer');

// 1. Вставте сюди ваші дані з браузера
const cookies = [
  { name: 'SID', value: 'test', domain: '.youtube.com' },
  { name: 'HSID', value: 'test', domain: '.youtube.com' },
  { name: 'SSID', value: 'test', domain: '.youtube.com' }
];

async function startBot() {
    console.log("Запуск браузера...");
    
    try {
        const browser = await puppeteer.launch({ 
            executablePath: '/usr/bin/google-chrome', // Обов'язково для Docker на Render
            headless: "new",
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ] 
        });

        const page = await browser.newPage();

        // 2. Встановлення куків ПЕРЕД заходом на сайт
        console.log("Встановлення куків...");
        await page.setCookie(...cookies);

        // 3. Перехід на YouTube
        console.log("Перехід на YouTube...");
        await page.goto('https://www.youtube.com', { waitUntil: 'networkidle2' });

        // Перевірка, чи ми залогінились (шукаємо аватарку або нікнейм)
        console.log("Бот залогінився через SID! Поточний URL: " + page.url());

        // Тут можна додати подальші дії (рендер або перегляд)
        
        // Щоб Render не вбивав процес, закриваємо браузер через деякий час
        setTimeout(async () => {
            await browser.close();
            console.log("Роботу завершено, браузер закрито.");
            process.exit(0); // Завершуємо процес успішно
        }, 30000); // Почекати 30 секунд

    } catch (error) {
        console.error("Помилка:", error);
        process.exit(1);
    }
}

startBot();
