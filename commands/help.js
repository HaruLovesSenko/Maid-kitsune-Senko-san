const { MessageEmbed } = require('discord.js');
const command = require('/app/exports/commandClass.js');

module.exports = class help extends command {
  constructor() {
    super("Displays the commands list and/or get extra info on a command!", "s?help or s?help [command]", "normal")
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
    let args = msg.content.split(" ")
    if (!args[1]) {
      let text = 'Do "s?help [category]" to see the commands in that category!```NORMAL``````FUN``````ROLEPLAY```'
      let embed = new MessageEmbed()
      .setTitle("COMMANDS")
      .setDescription(text)
      .setColor("ORANGE")
      msg.channel.send({ embed: embed })
    } else {
      let command = client.commands.find(
        x => x.constructor.name.toLowerCase() == args[1].toLowerCase()
      );
      if (!command) {
        let text = 'Do "s?help [command]" to get more info on a command!\n\n'
        if (args[1].toLowerCase() == "normal") {
          client.commands.forEach(command => {
            if (command.category == "normal") {
              text += `\`${command.constructor.name}\` `
            }
          })
        } else if (args[1].toLowerCase() == "fun") {
          client.commands.forEach(command => {
            if (command.category == "fun") {
              text += `\`${command.constructor.name}\` `
            }
          })
        } else if (args[1].toLowerCase() == "roleplay") {
          client.commands.forEach(command => {
            if (command.category == "roleplay") {
              text += `\`${command.constructor.name}\` `
            }
          })
        } else {
          return msg.channel.send({
          embed: {
            description:
              `${args[1]} is not a real command/category! Please try again with a real one.`,
            color: "RED"
          }
        });
        }
        let embed = new MessageEmbed()
        .setTitle(args[1].toUpperCase())
        .setDescription(text)
        .setColor("ORANGE")
        msg.channel.send({ embed: embed })
      }
      let embed = new MessageEmbed()
      .setTitle(command.constructor.name.toUpperCase())
      .addField("Description:", command.description)
      .addField("Usage:", command.usage)
      .setColor("ORANGE")
      msg.channel.send({ embed: embed })
    }
  }
}
