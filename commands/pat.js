const Discord = require('discord.js');
const command = require('/app/exports/commandClass.js');
const tenor = require('/app/exports/roleplay.js');

module.exports = class pat extends command {
  constructor() {
    super("Pat your friends to make them feel better! ( ´･･)ﾉ(._.`)", "s?pat [user]", "roleplay")
  }
  
  run(msg, client, using) {
    let a = msg.author.username
    let user = msg.mentions.users.first()
    let u;
    if (user) {
      u = user.username
    } else {
      u = "no"
    }
    let arr = [
      `${a} is patting ${u}`,
      `${a} gently pats ${u}`,
      `${a} is stroking ${u}'s head`,
      `${a} lightly strokes ${u}'s head`
    ]
    let msg2 = arr[Math.floor(Math.random()*arr.length)]
    new tenor("anime-headpat").sendGif(msg, msg2 + " ( ´･･)ﾉ(._.`)", user, "pat")
  }
}