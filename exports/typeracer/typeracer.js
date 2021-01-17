const db = require("ezpz.db");
const r = require("random-word");

module.exports = {
  run: (msg, using) => {
    if (using.has(msg.author.id))
      return msg.channel.send({
        embed: {
          description:
            "Please finish your last command before using a new one.",
          color: "RED"
        }
      });
    let p1 = msg.author;
    let p2 = msg.mentions.users.first();
    if (using.has(p2))
      return msg.channel.send({
        embed: {
          description: `${p2.tag} is currently inside a command. Please wait for them to finish before challenging them.`,
          color: "RED"
        }
      });
    if (!p2)
      return msg.channel.send({
        embed: {
          description: "you did not specify who you would like to race!",
          color: "RED"
        }
      });
    if (p2.id == msg.author.id)
      return msg.channel.send({
        embed: {
          color: "RED",
          description: "you cannot race yourself!"
        }
      });
    if (p2.bot)
      return msg.channel.send({
        embed: {
          color: "RED",
          description: "you cannot race a bot!"
        }
      });
    using.add(msg.author.id);
    using.add(p2.id);
    msg.channel
      .send({
        embed: {
          title: "TYPERACER",
          description: `${p2.tag}, ${msg.author.tag} is challenging you to **TYPERACER**. Do you accept? (y/n)`,
          color: "ORANGE"
        }
      })
      .then(() => {
        msg.channel
          .awaitMessages(
            response =>
              (response.content == "y" && response.author.id == p2.id) ||
              (response.content == "n" && response.author.id == p2.id),
            {
              max: 1,
              time: 60000,
              errors: ["time"]
            }
          )
          .then(async collected => {
            if (collected.first().content == "y") {
              let num = Math.floor(Math.random() * 9999999999999);
              db.set(`${msg.author.id}_${p2.id}`, {
                num: num,
                words: [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()]
              });
              msg.channel
                .send({
                  embed: {
                    color: "ORANGE",
                    description: `https://maid-kitsune-senko-san.herokuapp.com/typeracer/${msg.author.id}/${p2.id}`
                  }
                })
                .then(() => {
                  let win = false;
                  let c = msg.channel.createMessageCollector(
                    r => r.author.id == msg.author.id || r.author.id == p2.id,
                    { time: 60000 * 5 }
                  );
                  c.on("collect", message => {
                    if (message.content == num.toString()) {
                      msg.channel.send({
                        embed: {
                          description:
                            "GG! The winner is " + message.author.username,
                          color: "GREEN"
                        }
                      });
                      win = true;
                      c.stop();
                    }
                  });

                  c.on("end", () => {
                    using.delete(msg.author.id);
                    using.delete(p2.id);
                    db.delete(`${msg.author.id}_${p2.id}`);
                    if (win) return;
                    msg.channel.send({
                      embed: {
                        color: "RED",
                        description:
                          "Both of you took too long to give me the number. Game ended."
                      }
                    });
                  });
                });
            } else {
              using.delete(p1.id);
              using.delete(p2.id);
              msg.channel.send({
                embed: {
                  description: `${p2.tag} did not accept the challenge....`,
                  color: "RED"
                }
              });
            }
          })
          .catch(e => {
            using.delete(p1.id);
            using.delete(p2.id);
            console.log(e);
            msg.channel.send({
              embed: {
                description: `No response from ${p2.tag}. Fight has been cancelled.`,
                color: "RED"
              }
            });
          });
      });
  }
};
