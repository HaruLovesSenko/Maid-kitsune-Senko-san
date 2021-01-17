const Discord = require("discord.js");
const command = require("/app/exports/commandClass.js");

module.exports = class ping extends command {
  constructor() {
    super("ping", "Displays the bot's current ping", "s?ping");
  }

  run(msg, client, using) {
    if (using.has(msg.author.id))
      return msg.channel.send({
        embed: {
          description:
            "Please finish your last command before using a new one.",
          color: "RED"
        }
      });
    msg.channel.send({embed:{
      title: "PONG! :ping_pong:",
      description: `My ping is ${client.ws.ping}ms!`,
      color: "ORANGE"
    }})
  }
};
