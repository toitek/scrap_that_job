import puppeteer from 'puppeteer';

async function scrapeJobs(url: string) {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the given URL
  await page.goto(url);

  // Define a function to extract the job information from the current page
  const extractJobs = async () => {
    // Extract the job information from the page
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.job-listing');
      return Array.from(jobElements).map(element => {
        const titleElement = element.querySelector('.job-title');
        const title = titleElement ? titleElement.textContent : '';
  
        const applicationLinkElement = element.querySelector('.apply-button');
        const applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
  
        return { title, applicationLink };
      });
    });
  
    // Log the job information to the console
    console.log(jobs);
  };

  // Extract the job information from the current page
  await extractJobs();

  // Check if there is a "next" button to paginate to the next page
  const nextButtonSelector = '.pagination-next';
  if (await page.$(nextButtonSelector)) {
    // If the "next" button exists, click it and extract the job information from the next page
    while (await page.$(nextButtonSelector)) {
      await page.click(nextButtonSelector);
      await page.waitForSelector(nextButtonSelector);
      await extractJobs();
    }
  }

  // Close the browser and end the Puppeteer session
  await browser.close();
}
  

  scrapeJobs('https://www.builtinnyc.com/jobs');