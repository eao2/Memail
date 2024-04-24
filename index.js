const { Cluster } = require('puppeteer-cluster');
require("dotenv").config();

const email = process.env.FB_EMAIL;
const password = process.env.FB_PASS;
const recipientId = process.env.RECIPIENTID;
const message = process.env.MESSAGE;

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data: { email, password, recipientId, message } }) => {
    // Navigate to Facebook and log in
    await page.goto('https://www.messenger.com');
    await new Promise(resolve => setTimeout(resolve, 1000));
    // await page.waitForSelector('#email'); // Wait for the email input field
    await page.type('#email', email);
    await page.type('#pass', password);
    await page.click('#loginbutton');

    // Wait for navigation to complete
    await page.waitForNavigation();

    // Navigate to your friend's conversation or profile
    await page.goto(`https://www.messenger.com/t/${recipientId}`);

    // Wait for a second for the page to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Type the message
    await page.keyboard.type(message);

    // Send the message by pressing Enter
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Message sent.');
  });

  await cluster.queue({ email, password, recipientId, message });
  await cluster.idle();
  await cluster.close();
})();
