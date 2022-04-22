export default function handleTweets(tweets, users, page) {
  let output = [];
  let queryStartPoint;
  const length = tweets.length;
  const queryEndPoint = length - 10 * (page - 1);

  page * 10 > length
    ? (queryStartPoint = 0)
    : (queryStartPoint = length - page * 10);

  length > 10
    ? (output = tweets.slice(queryStartPoint, queryEndPoint))
    : (output = tweets);

  for (const tweet of output) {
    const user = users.find((user) => user.username === tweet.username);
    tweet.avatar = user.avatar;
  }
  return output;
}
