import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1️⃣ Fetch latest article from Laravel
const { data: articles } = await axios.get(process.env.LARAVEL_API);
if (!articles.length) {
  console.log("No articles found");
  process.exit();
}

const article = articles[0];
console.log("Original article:", article.title);

// 2️⃣ Google search using Puppeteer
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto(
  `https://www.google.com/search?q=${encodeURIComponent(article.title)}`,
  { waitUntil: "domcontentloaded" }
);

const links = await page.$$eval("a", els =>
  els
    .map(a => a.href)
    .filter(h =>
      h.startsWith("http") &&
      !h.includes("google.com")
    )
    .slice(0, 2)
);

await browser.close();

console.log("Reference links:", links);

// 3️⃣ Scrape content from reference articles
async function scrapeContent(url) {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  return $("article").text() || $("p").text();
}

const referenceTexts = await Promise.all(
  links.map(scrapeContent)
);

// 4️⃣ Rewrite using LLM
const prompt = `
Rewrite the following article to match the structure, depth, and SEO quality
of the reference articles.

Original Article:
${article.content}

Reference Articles:
${referenceTexts.join("\n\n")}

Add a References section at the bottom.
`;

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
});

const rewrittenContent =
  completion.choices[0].message.content +
  "\n\nReferences:\n" +
  links.join("\n");

// 5️⃣ Publish updated article to Laravel
await axios.post(process.env.LARAVEL_API, {
  title: article.title + " (Updated)",
  content: rewrittenContent,
  source_url: links.join(", "),
  version: "updated",
});

console.log("Updated article published successfully 🚀");
