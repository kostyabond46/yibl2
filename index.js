const browser = await puppeteer.launch({
    // Обов'язково вказуємо цей шлях для Docker-образу Puppeteer
    executablePath: '/usr/bin/google-chrome', 
    headless: "new",
    args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
    ]
});
