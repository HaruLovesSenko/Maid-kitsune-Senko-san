const prefix = "s?";
const using = new Set();

module.exports = (client, msg) => {
  if (msg.content.toLowerCase().startsWith(prefix)) {
    try {
      let name = msg.content.slice(prefix.length).split(" ")[0];
      let command = client.commands.find(
        x => x.constructor.name.toLowerCase() == name.toLowerCase()
      );
      return command.run(msg, client, using);
    } catch (err) {
      console.log(err);
    }
  }
  if (msg.member && msg.member.hasPermission("ADMINISTRATOR") && msg.guild.id == "791993321374613514") {
    if (msg.content.startsWith("s@rule")) {
      msg.delete();
      let rules = require("/app/exports/serverRules.js");
      let args = msg.content.split(" ")[1];
      if (isNaN(parseInt(args))) return;
      let ruleNum = parseInt(args) - 1;
      if (!rules[ruleNum]) return;
      let embed = {
        embed: {
          color: "ORANGE",
          fields: rules[ruleNum],
          thumbnail: {
            url:
              "https://cdn.discordapp.com/attachments/791998146565373953/792350198356901888/images-removebg-preview.png"
          }
        }
      };
      return msg.channel.send(embed);
    } else if (msg.content.startsWith("s@image")) {
      msg.delete();
      return msg.channel.send({
        embed: {
          color: "ORANGE",
          thumbnail: {
            url:
              "https://cdn.discordapp.com/attachments/791998146565373953/792350198356901888/images-removebg-preview.png"
          },
          description: `We understand why you ask "Why can't I send images?" or "Why is this link not making an image appear?". Just be patient and keep chatting in the server! Soon, you will get the <@&792185558863970325> role then you will be able to send images! <:SK_stronk:792073244156231710>`
        }
      });
    }
  }
  if (msg.author.id == "552121720622809109") {
    if (msg.content.toLowerCase().startsWith("s?say ")) {
      msg.delete();
      return msg.channel.send(
        msg.content
          .split(" ")
          .slice(1)
          .join(" ")
      );
    } else if (msg.content.toLowerCase().startsWith("s?mimic ")) {
      msg.delete();
      let user =
        msg.mentions.members.first() ||
        msg.guild.members.cache.get(msg.content.split(" ")[1]);
      if (!user) return;
      let name = user.nickname || user.user.username;
      msg.channel
        .createWebhook(name, {
          avatar: user.user.displayAvatarURL({ format: "png" })
        })
        .then(w => {
          w.send(
            msg.content
              .split(" ")
              .slice(2)
              .join(" ")
          ).then(() => {
            w.delete();
          });
        })
        .catch(e => {
          return console.log(e);
        });
    } else if (msg.content.startsWith("s?eval")) {
      if (
        msg.author.id == "552121720622809109" ||
        msg.author.id == "290206464423755796"
      ) {
        try {
          let argss = msg.content
            .split("```js")
            .slice(1)
            .join("");
          let argsss = argss.split("```");
          const code = argsss.join("");
          let evaled = eval(code);

          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

          return msg.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
          return msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      }
    }
  }
};

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
