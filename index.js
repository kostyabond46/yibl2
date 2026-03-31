const puppeteer = require('puppeteer');

async function startBot() {
    console.log("Запуск браузера...");
    
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--single-process'
            ]
        });

        const page = await browser.newPage();
        
        // Встановлюємо розмір вікна
        await page.setViewport({ width: 1280, height: 720 });

        console.log("Перехід на YouTube Studio...");
        await page.goto('https://youtube.com', { waitUntil: 'networkidle2' });

        // Тут скрипт зупиниться, бо потрібна авторизація.
        // На безкоштовному Render ви не побачите екран, 
        // тому логін треба робити через Cookies (якщо цікаво - запитуй).
        
        console.log("Сторінка завантажена. Поточний URL: " + page.url());

        await browser.close();
        console.log("Браузер закрито.");
    } catch (error) {
        console.error("Сталася помилка:", error);
    }
}

startBot();
