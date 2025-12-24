import puppeteer from "puppeteer";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/articles";

async function scrapeBeyondChats() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://beyondchats.com/blogs/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });

  // Extract actual blog cards
  const articles = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll("article").forEach((el) => {
      const title = el.querySelector("h2, h3")?.innerText;
      const content = el.querySelector("p")?.innerText;
      const link = el.querySelector("a")?.href;

      if (title && content && link) {
        results.push({ title, content, link });
      }
    });
    return results;
  });

  console.log(`Found ${articles.length} articles`);

  for (const art of articles) {
    try {
      await axios.post(API_URL, {
        title: art.title,
        content: art.content,
        source_url: art.link,
        version: "original",
      });
      console.log(`Inserted: ${art.title}`);
    } catch (err) {
      console.error("Insert failed:", err.message);
    }
  }

  await browser.close();
}

scrapeBeyondChats();
