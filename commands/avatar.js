const Discord = require("discord.js");
const command = require("../exports/commandClass.js");

module.exports = class avatar extends command {
  constructor() {
    super("Show a bigger form of a user's pfp", "s?avatar [user/id]", "normal");
  }

  run(msg, client, using) {
    let args = msg.content.split(" ")[1]
    let user = msg.mentions.users.first() || client.users.cache.get(args) || msg.author
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.tag)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 512, format: 'png' }))
    .setColor("ORANGE");
    msg.channel.send({ embed: embed })
  }
};