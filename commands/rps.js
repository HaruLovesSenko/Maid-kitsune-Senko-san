const Discord = require("discord.js");
const command = require("/app/exports/commandClass.js");

module.exports = class rps extends command {
  constructor() {
    super(
      'Play "rock paper scissors" againts your friends!',
      "s?rps [user]",
      "fun"
    );
  }

  run(msg, client, using) {
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
          description:
            "you did not specify who you would like to play againts!",
          color: "RED"
        }
      });
    if (p2.id == msg.author.id)
      return msg.channel.send({
        embed: {
          color: "RED",
          description: "you cannot play against yourself!"
        }
      });
    if (p2.bot)
      return msg.channel.send({
        embed: {
          color: "RED",
          description: "you cannot play against a bot!"
        }
      });
    using.add(msg.author.id);
    using.add(p2.id);
    msg.channel
      .send({
        embed: {
          title: "ROCK PAPER SCISSORS",
          description: `${p2.tag}, ${msg.author.tag} is challenging you to **ROCK PAPER SCISSORS**. Do you accept? (y/n)`,
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
          .then(message => {
            if (message.first().content == "y") {
              let choice1;
              let choice2;
              p1.send({
                embed: {
                  description: `:rock: - Rock
:newspaper: - Paper
:scissors: - Scissors`,
                  color: "ORANGE"
                }
              }).then(m => {
                m.react("🪨")
                  .then(() => m.react("📰"))
                  .then(() => m.react("✂"))
                  .then(() => {
                    {
                      m.awaitReactions(
                        (reaction, user) =>
                          (reaction.emoji.name === "🪨" && user.id === p1.id) ||
                          (reaction.emoji.name === "📰" && user.id === p1.id) ||
                          (reaction.emoji.name === "✂" && user.id === p1.id),
                        { time: 60000, errors: ['time'], max: 1 }
                      )
                      .then(r => {
                        if (r.first().emoji.name == "🪨") {
                          choice1 = 1
                        } else if (r.first().emoji.name == "📰") {
                          choice1 = 2
                        } else {
                          choice1 = 3
                        }
                      }).catch(e => {
                        console.log(e)
                        using.delete(p1.id)
                        using.delete(p2.id)
                        p1.send({embed: {
                          color: "RED",
                          description: "You took too long to answer. Game canceled."
                        }})
                        msg.channel.send({embed: {
                          color: "RED",
                          description: `${p1.tag} took too long to answer. Game canceled.`
                        }})
                        choice1 = 0;
                        choice2 = 0;
                      })
                    }
                  });
              }).catch(e => {
                console.log(e)
                using.delete(p1.id)
                using.delete(p2.id)
                msg.channel.send({embed: {
                  color: "RED",
                  description: `I could not send a message to ${p1.tag}. Game canceled`
                }})
                choice1 = 0;
                choice2 = 0;
              });
              p2.send({
                embed: {
                  description: `:rock: - Rock
:newspaper: - Paper
:scissors: - Scissors`,
                  color: "ORANGE"
                }
              }).then(m => {
                m.react("🪨")
                  .then(() => m.react("📰"))
                  .then(() => m.react("✂"))
                  .then(() => {
                    {
                      m.awaitReactions(
                        (reaction, user) =>
                          (reaction.emoji.name === "🪨" && user.id === p2.id) ||
                          (reaction.emoji.name === "📰" && user.id === p2.id) ||
                          (reaction.emoji.name === "✂" && user.id === p2.id),
                        { time: 60000, errors: ['time'], max: 1 }
                      )
                      .then(r => {
                        if (r.first().emoji.name == "🪨") {
                          choice2 = 1
                        } else if (r.first().emoji.name == "📰") {
                          choice2 = 2
                        } else {
                          choice2 = 3
                        }
                      }).catch(e => {
                        console.log(e)
                        using.delete(p1.id)
                        using.delete(p2.id)
                        p1.send({embed: {
                          color: "RED",
                          description: "You took too long to answer. Game canceled."
                        }})
                        msg.channel.send({embed: {
                          color: "RED",
                          description: `${p2.tag} took too long to answer. Game canceled.`
                        }})
                        choice1 = 0;
                        choice2 = 0;
                      })
                    }
                  });
              }).catch(e => {
                console.log(e)
                using.delete(p1.id)
                using.delete(p2.id)
                msg.channel.send({embed: {
                  color: "RED",
                  description: `I could not send a message to ${p2.username}. Game canceled`
                }})
                choice1 = 0;
                choice2 = 0;
              });
              let theInterval = setInterval(() => {
                if (!choice1 || !choice2) return;
                let result
                if (choice1 == 1 && choice2 == 1) {
                  result = "Game ended in a tie!"
                } else if (choice1 == 2 && choice2 == 2) {
                  result = "Game ended in a tie!"
                } else if (choice1 == 3 && choice2 == 3) {
                  result = "Game ended in a tie!"
                } else if (choice1 == 1 && choice2 == 3) {
                  result = `${p1.tag} wins!`
                } else if (choice1 == 2 && choice2 == 1) {
                  result = `${p1.tag} wins!`
                } else if (choice1 == 3 && choice2 == 2) {
                  result = `${p1.tag} wins!`
                } else if (choice1 == 3 && choice2 == 1) {
                  result = `${p2.tag} wins!`
                } else if (choice1 == 1 && choice2 == 2) {
                  result = `${p2.tag} wins!`
                } else if (choice1 == 2 && choice2 == 3) {
                  result = `${p2.tag} wins!`
                }
                clearInterval(theInterval)
                let arr = ["🪨", "📰", "✂"]
                msg.channel.send({embed: {
                  color: "GREEN",
                  description: `${p1.username} picked ${arr[choice1 -1]}
${p2.username} picked ${arr[choice2 - 1]}

GG! ${result}`
                }})
                using.delete(p1.id)
                using.delete(p2.id)
              }, 1000)
            } else {
              using.delete(p1.id);
              using.delete(p2.id);
              msg.channel.send({
                embed: {
                  description: `${p2.username} did not accept the challenge....`,
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
                description: `No response from ${p2.username}. Game has been cancelled.`,
                color: "RED"
              }
            });
          });
      });
  }
};
