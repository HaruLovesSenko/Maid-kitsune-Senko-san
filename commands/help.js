const { MessageEmbed } = require('discord.js')
const command = require('/app/exports/commandClass.js')

module.exports = class help extends command {
  constructor() {
    super("help", "Displays this command list and/or get extra info on a command!", "s?help or s?help [command]")
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
      let text = `Do "s?help [command]" to get more info on a command!\n\n`
      client.commands.forEach(command => {
        text += `\`${command.name}\` `
      })
      let embed = new MessageEmbed()
      .setTitle("COMMANDS")
      .setDescription(text)
      .setColor("ORANGE")
      msg.channel.send({ embed: embed })
    } else {
      let command = client.commands.find(
        x => x.name.toLowerCase() == args[1].toLowerCase()
      );
      if (!command) return msg.channel.send({
        embed: {
          description:
            `${args[1]} is not a real command! Please try again with a real command.`,
          color: "RED"
        }
      });
      let embed = new MessageEmbed()
      .setTitle(command.name.toUpperCase())
      .addField("Description:", command.description)
      .addField("Usage:", command.usage)
      .setColor("ORANGE")
      msg.channel.send({ embed: embed })
    }
  }
}