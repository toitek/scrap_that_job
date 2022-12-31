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
    // Check the structure of the page and use the appropriate DOM selectors and functions to extract the job information
    let jobs;
    if (await page.$('.job-listing')) {
      // Extract the job information from a page with the expected structure
      jobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.job-listing');
        return Array.from(jobElements).map(element => {
          const titleElement = element.querySelector('.job-title');
          const title = titleElement ? titleElement.textContent : '';
    
          const applicationLinkElement = element.querySelector('.apply-button');
          const applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
    
          return { title, applicationLink };
        });
      });
    } else if (await page.$('.job')) {
      // Extract the job information from a page with a different structure
      jobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.job');
        return Array.from(jobElements).map(element => {
          const titleElement = element.querySelector('.title');
          const title = titleElement ? titleElement.textContent : '';
    
          const applicationLinkElement = element.querySelector('.apply-button');
          const applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
    
          return { title, applicationLink };
        });
      });
    } else {
      // Extract the job information from a page with a different structure
      jobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.position');
        return Array.from(jobElements).map(element => {
          const titleElement = element.querySelector('.title');
          const title = titleElement ? titleElement.textContent : '';
    
          const applicationLinkElement = element.querySelector('.apply-button');
          const applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
    
          return { title, applicationLink };
        });
      });
    }
  
    // Log the job information to the console
    console.log(jobs);
      // Check if there is a "next" button to paginate to the next page
  const nextButtonSelector = '.pagination-next';
  if (await page.$(nextButtonSelector)) {
    // Click the "next" button
    await page.click(nextButtonSelector);

    // Wait for the page to load
    await page.waitForNavigation();

    // Extract the job information from the next page
    await extractJobs();
  } else {
    // Close the browser
    await browser.close();
  }
}

// Extract the job information from the current page
await extractJobs();

};


scrapeJobs('https://www.example.com/careers');
