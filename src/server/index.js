import express from "express";
import chalk from "chalk";
import * as fs from "fs";
import os from "os";

const app = express(),
  port = process.env.PORT || 5000,
  USERS_PATH = "src/data/users.json",
  TWEETS_PATH = "src/data/tweets.json";

app.get("/", (req, res) => {
  fs.readFile(USERS_PATH, (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
  console.log(`Processing request from ${chalk.bold.red(req.ip)}`);
});

app.listen(port, () => {
  console.log(
    chalk.underline.green(`Server is running on port ${chalk.bold.green(port)}`)
  );
});
