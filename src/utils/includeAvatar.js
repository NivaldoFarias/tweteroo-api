export default function includeAvatar(tweets, users) {
  let output = [];
  if (tweets.length > 10) {
    output = tweets.slice(tweets.length - 10, tweets.length - 1);
  } else output = tweets;
  for (const tweet of output) {
    const user = users.find((user) => user.username === tweet.username);
    tweet.avatar = user.avatar;
  }
  return output;
}
