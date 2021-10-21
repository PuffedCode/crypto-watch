// const express = require("express");
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

const coinbaseBaseURL = "https://api.coinbase.com";
const geminiBaseURL = "https://api.gemini.com";

/**
 * Both coinbase store buy and sell prices.
 * * :action is to determine whether this is to find the "sell" or "buy" prices
 * * :currency_pair is the cryto and price pair to be search ie. "BTC-USD"
 */
app.get("/coinbase/:action/:currency_pair", async (req, res) => {
  try {
    const currency_pair = req.params.currency_pair;
    const action = req.params.action;
    const api_url = `${coinbaseBaseURL}/v2/prices/${currency_pair}/${action}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  } catch (error) {
    console.error(error);
  }
});

/**
 * Both gemini store ask and bid prices.
 * * :currency_pair is the cryto and price pair to be search ie. "btcusd"
 */
app.get("/gemini/prices/:currency_pair", async (req, res) => {
  try {
    const currency_pair = req.params.currency_pair;
    const api_url = `${geminiBaseURL}/v1/pubticker/${currency_pair}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
