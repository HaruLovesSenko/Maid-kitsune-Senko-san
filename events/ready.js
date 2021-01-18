module.exports = (client) => {
  let num = Math.floor(Math.random() * 2);
  setInterval(() => {
    if (num == 0) {
      client.user.setActivity("over the hotel || s?help", { type: "WATCHING" });
      num++;
    } else {
      client.user.setActivity("with visitors || s?help", { type: "PLAYING" });
      num--;
    }
  }, 10000);
  console.log("┌──────────────────┐\n| Im ready to help |\n└──────────────────┘");
}