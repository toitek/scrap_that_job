import puppeteer from 'puppeteer';


async function scrapeJobs(url: string) {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    // Navigate to the given URL
    await page.goto(url);
    
    await browser.close();
  }
  
