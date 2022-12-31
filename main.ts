import puppeteer from 'puppeteer';


async function scrapeJobs(url: string) {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    // Navigate to the given URL
    await page.goto(url);
    // Extract the job information from the page
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-listing');
      return Array.from(jobElements).map((jobElement: any) => {
        const title = jobElement.querySelector('.job-title').innerText;
        const link = jobElement.querySelector('.job-apply-button').href;
        return { title, link };
      });
    });
    // Log the job information to the console
    console.log(jobs);
    // Close the browser when you're done
    await browser.close();
  }
  

  scrapeJobs('https://www.builtinnyc.com/jobs');