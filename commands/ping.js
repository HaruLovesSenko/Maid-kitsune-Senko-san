const Discord = require("discord.js");
const command = require("../exports/commandClass.js");

module.exports = class ping extends command {
  constructor() {
    super("Displays the bot's current ping", "s?ping", "normal");
  }

  run(msg, client, using) {
    msg.channel.send({embed:{
      title: "PONG! :ping_pong:",
      description: `My ping is ${client.ws.ping}ms!`,
      color: "ORANGE"
    }})
  }
};
