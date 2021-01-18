const Discord = require('discord.js');
const command = require('/app/exports/commandClass.js');
const tenor = require('/app/exports/roleplay.js');

module.exports = class hug extends command {
  constructor() {
    super("Hug your closest friends! 🤗", "s?hug [user]", "roleplay")
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
      `${a} is hugging ${u}!`,
      `${a} is holding ${u} very thightly!`,
      `${a} is placing their arms around ${u}!`,
      `${a} is squeezing ${u}!`,
      `${a} is cuddling with ${u}!`
    ]
    let msg2 = arr[Math.floor(Math.random()*arr.length)]
    new tenor("anime-hug").sendGif(msg, msg2 + " 🤗", user)
  }
}