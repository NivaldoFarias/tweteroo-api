export default function includeAvatar(tweets, users) {
  const output = tweets;
  for (const tweet of output) {
    const user = users.find((user) => user.username === tweet.username);
    tweet.avatar = user.avatar;
  }
  return output;
}
