const Discord = require('discord.js');
const command = require('/app/exports/commandClass.js');
const tenor = require('/app/exports/roleplay.js');

module.exports = class highfive extends command {
  constructor() {
    super("Highfive your friends! (。・∀・)ノヽ(・∀・ )", "s?highfive [user]", "roleplay")
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
      `${a} high fived ${u}`
    ]
    let msg2 = arr[Math.floor(Math.random()*arr.length)]
    new tenor("anime-highfive").sendGif(msg, msg2 + " (。・∀・)ノヽ(・∀・ )", user, "highfive")
  }
}