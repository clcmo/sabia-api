const functions = require("firebase-functions");
const express = require("express");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();

app.get("/conteudos", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://apprendendo.blog/feed");
    const posts = feed.items.map(item => ({
      titulo: item.title,
      link: item.link,
      resumo: item.contentSnippet || "",
      data: item.pubDate,
      conteudo: item["content:encoded"] || item.content || ""
    }));
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Erro ao ler feed" });
  }
});

exports.api = functions.https.onRequest(app);
