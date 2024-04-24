const puppeteer = require('puppeteer-core');
const Chromeless = require('@serverless-chrome/lambda');
require("dotenv").config();

const email = process.env.FB_EMAIL;
const password = process.env.FB_PASS;
const recipientId = process.env.RECIPIENTID;
const message = process.env.MESSAGE;

async function sendMessageToFriend() {
  let chromeless = null;
  try {
    // Initialize Chromeless instance
    chromeless = new Chromeless();

    // Navigate to Facebook and log in
    await chromeless.goto('https://www.messenger.com');
    await chromeless.type('#email', email);
    await chromeless.type('#pass', password);
    await chromeless.click('#loginbutton');

    // Wait for navigation to complete
    await chromeless.wait();

    // Navigate to your friend's conversation or profile
    await chromeless.goto(`https://www.messenger.com/t/${recipientId}`);

    // Wait for the message input field to appear
    await chromeless.wait('[contenteditable="true"]');

    // Type the message
    await chromeless.type(message);

    // Send the message by pressing Enter
    await chromeless.press(13); // Key code for Enter

    console.log('Message sent.');
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    // Close the browser
    if (chromeless !== null) {
      await chromeless.end();
    }
  }
}

// Use sendMessageToFriend() in an async context
(async () => {
  await sendMessageToFriend();
})();
