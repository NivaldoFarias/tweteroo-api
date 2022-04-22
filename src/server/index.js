import express from "express";
import chalk from "chalk";
import * as fs from "fs";
import os from "os";

import requestData from "./../utils/requestData.js";
import handleTweets from "./../utils/handleTweets.js";

const app = express().use(express.json());
const port = process.env.PORT || 5000;
const USERS_PATH = "src/data/users.json";
const TWEETS_PATH = "src/data/tweets.json";

app.get("/tweets", (req, res) => {
  const tweets = JSON.parse(fs.readFileSync(TWEETS_PATH, "utf8"));
  const users = JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));
  const output = handleTweets(tweets, users);
  res.send(output);
});

app.post("/sign-up", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(USERS_PATH));
  fileData.push(req.body);

  fs.writeFile(USERS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(chalk.bold.yellow(`User "${req.body.username}" created!`));
  });
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(TWEETS_PATH));
  fileData.push(req.body);

  fs.writeFile(TWEETS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(
      chalk.bold.yellow(
        `Tweet "${req.body.tweet}" by user "${req.body.username}" created!`
      )
    );
  });
  res.send("OK");
});

app.listen(port, () => {
  console.log(
    chalk.underline.green(`Server is running on port ${chalk.bold.green(port)}`)
  );
});
