import express from "express";
import chalk from "chalk";
import * as fs from "fs";
import os from "os";

const app = express().use(express.json());
const port = process.env.PORT || 5000;
const USERS_PATH = "src/data/users.json";
const TWEETS_PATH = "src/data/tweets.json";

app.get("/", (req, res) => {
  fs.readFile(USERS_PATH, (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
  console.log(requestData(req));
});

app.post("/signup", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(USERS_PATH));
  fileData.push(req.body);

  fs.writeFile(USERS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(chalk.bold.yellow(`User ${req.body.username} created!`));
  });
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(TWEETS_PATH));
  fileData.push(req.body);

  fs.writeFile(TWEETS_PATH, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw err;
    console.log(chalk.bold.yellow(`Tweet ${req.body.tweet} created!`));
  });
  res.send("OK");
});

app.listen(port, () => {
  console.log(
    chalk.underline.green(`Server is running on port ${chalk.bold.green(port)}`)
  );
});

function requestData(req) {
  return `
    IP: ${chalk.bold.red(req.ip)}
    METHOD: ${chalk.bold.green(req.method)} 
    URL: ${chalk.bold.blue(req.url)}
    PORT: ${chalk.bold.yellow(port)}
    USER AGENT: ${chalk.bold.cyan(req.get("User-Agent"))}
    `;
}
