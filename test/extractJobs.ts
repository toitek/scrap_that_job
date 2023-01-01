import puppeteer from 'puppeteer';
import { scrapeJobs } from '../src/main';

describe('scrapeJobs', () => {
  it('should scrape jobs from the given URL', async () => {
    // Mock the browser and page objects
    const browser = {
      newPage: jest.fn().mockReturnValue({
        goto: jest.fn().mockResolvedValue(true),
        $: jest.fn().mockReturnValue(true),
        evaluate: jest.fn().mockReturnValue([{ title: 'Job 1', applicationLink: 'link1' }, { title: 'Job 2', applicationLink: 'link2' }]),
        click: jest.fn().mockResolvedValue(true),
        waitForNavigation: jest.fn().mockResolvedValue(true),
      }),
      close: jest.fn().mockResolvedValue(true),
    };
    puppeteer.launch = jest.fn().mockResolvedValue(browser);

    // Create a new page object
    const page = await browser.newPage();

    // Call the scrapeJobs function
    await scrapeJobs('https://www.example.com/jobs');

    // Assert that the browser and page objects were used as expected
    expect(puppeteer.launch).toHaveBeenCalled();
    expect(browser.newPage).toHaveBeenCalled();
    expect(page.goto).toHaveBeenCalledWith('https://www.example.com/jobs');
    expect(page.$).toHaveBeenCalledWith('.pagination-next');
    expect(page.evaluate).toHaveBeenCalledTimes(2);
    expect(page.click).toHaveBeenCalledWith('.pagination-next');
    expect(page.waitForNavigation).toHaveBeenCalled();
    expect(browser.close).toHaveBeenCalled();
  });
});
