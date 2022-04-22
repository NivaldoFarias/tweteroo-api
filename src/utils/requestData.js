export default function requestData(req) {
  return `
    IP: ${chalk.bold.red(req.ip)}
    METHOD: ${chalk.bold.green(req.method)} 
    URL: ${chalk.bold.blue(req.url)}
    PORT: ${chalk.bold.yellow(port)}
    USER AGENT: ${chalk.bold.cyan(req.get("User-Agent"))}
    `;
}
