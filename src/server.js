import express from "express";
import chalk from "chalk";

const app = express(),
  port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(
    chalk.underline.green(`Server is running on port ${chalk.bold.green(port)}`)
  );
});
