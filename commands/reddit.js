const Discord = require("discord.js");
const command = require('/app/exports/commandClass.js')

module.exports = class reddit extends command {
  constructor() {
    super("Search for a post in from subreddits!", "s?reddit")
  }
  
  async run(msg, client, using) {
    if (using.has(msg.author.id))
      return msg.channel.send({
        embed: {
          description: "Please finish your last command before using a new one.",
          color: "RED"
        }
      });
    using.add(msg.author.id);
    const { meme } = require("memejs");
    let subs = [
      "memes",
      "animemes",
      "blursedimages",
      "sewayakikitsune",
      "churchofsenko",
      "hololive"
    ];
    let text = "";
    for (let i = 0; i < subs.length; i++) {
      text += `${i + 1}. ${subs[i]}\n`;
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`Please pick one of these ${subs.length} subreddits`)
      .setDescription(text)
      .setColor("ORANGE")
      .setFooter(`Type "cancel" to cancel.`);
    let m2 = await msg.channel.send({ embed: embed });
    let collector = msg.channel.createMessageCollector(
      r => r.author.id == msg.author.id,
      { idle: 60000 }
    );
    let sub = false;
    collector.on("collect", message => {
      message.delete();
      if (message.content.toLowerCase() == "cancel") {
        sub = "cancel";
        msg.channel.send({
          embed: {
            color: "RED",
            description: "The command has been canceled!"
          }
        });
        return collector.stop();
      }
      let num = parseInt(message.content);
      if (isNaN(num)) {
        sub = subs.find(s => s == message.content.toLowerCase());
        if (!sub)
          return msg.channel.send({
            embed: {
              color: "RED",
              description: "That subreddit is not in the list!"
            }
          });
        return collector.stop();
      } else {
        sub = subs[num - 1];
        if (!sub)
          return msg.channel.send({
            embed: {
              color: "RED",
              description: "That subreddit is not in the list!"
            }
          });
        return collector.stop();
      }
    });

    collector.on("end", async () => {
      using.delete(msg.author.id);
      if (!sub && sub != "cancel")
        return msg.channel.send({
          embed: {
            color: "RED",
            description:
              "You ran out of time! Run the command again to try again."
          }
        });
      if (sub == "cancel") return;
      let m = await msg.channel.send({
        embed: {
          color: "GREEN",
          description: "Searching for a post... :mag:"
        }
      });
      return meme(sub, (err, data) => sendMeme(err, data, m, m2));
    });

    let sendMeme = (err, data, m, m2) => {
      m.delete().catch(console.log())
      m2.delete().catch(console.log())
      if (err) return console.log(err)
      let embed2 = new Discord.MessageEmbed()
        .setTitle(data.title)
        .setColor("ORANGE")
        .setImage(data.url)
        .setFooter(`Meme by: u/${data.author} | Meme from: r/${data.subreddit}`);
      return msg.channel.send({ embed: embed2 });
    };
  }
}
