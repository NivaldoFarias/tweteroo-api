import express from "express";
import chalk from "chalk";
import * as fs from "fs";
import os from "os";

import * as utils from "./../utils/index.js";

const app = express().use(express.json());
const PORT = process.env.PORT || 5000;
const USERS_PATH = "src/data/users.json";
const TWEETS_PATH = "src/data/tweets.json";

app.get("/tweets", (req, res) => {
  if (
    Object.keys(req.query).length &&
    (!req.query.page || isNaN(req.query.page) || req.query.page <= 1)
  ) {
    res.status(400).send("Informe uma página válida!");
    return;
  }
  console.log();
  const page = req.query.page || 1;
  const tweets = JSON.parse(fs.readFileSync(TWEETS_PATH, "utf8"));
  const users = JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));
  const output = utils.handleTweets(tweets, users, page);
  res.send(output);
});

app.get("/tweets/:username", (req, res) => {
  const { username: reqUser } = req.params;
  const tweets = JSON.parse(fs.readFileSync(TWEETS_PATH, "utf8"));
  const users = JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));
  const output = utils.handleTweets(tweets, users);
  res.send(output.filter((tweet) => tweet.username === reqUser));
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  } else if (!utils.validUrl(avatar) || !utils.validImage(avatar)) {
    res.sendStatus(400);
    return;
  }

  const fileData = JSON.parse(fs.readFileSync(USERS_PATH));
  fileData.push(req.body);

  fs.writeFile(USERS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(chalk.bold.yellow(`User "${username}" created!`));
  });
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.header("user");
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const fileData = JSON.parse(fs.readFileSync(TWEETS_PATH));
  fileData.push({
    username,
    tweet,
  });

  fs.writeFile(TWEETS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(
      chalk.bold.yellow(`Tweet "${tweet}" by user "${username}" created!`)
    );
  });
  res.status(201).send("OK");
});

app.listen(PORT, () => {
  console.log(
    chalk.underline.green(`Server is running on port ${chalk.bold.green(PORT)}`)
  );
});
