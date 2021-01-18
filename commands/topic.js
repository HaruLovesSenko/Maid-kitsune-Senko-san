const Discord = require("discord.js");
const command = require('/app/exports/commandClass.js')

module.exports = class topic extends command {
  constructor() {
    super("Generates a random topic to talk about!", "s?topic")
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
    const fetch = require("node-fetch");
    fetch("https://conversationstartersworld.com/random-question-generator/")
      .then(res => res.text())
      .then(body => {
        let first = body.split(`</p></blockquote><script type="text/javascript">
var args_tf_quotescollection_1 = {"instanceID":"tf_quotescollectio`)[0];
        let second = first.split(
          `<blockquote class="quotescollection-quote" style="background-color:#313131;color:#eeeeee;"><p>`
        )[1];
        return msg.channel.send({
          embed: { color: "ORANGE", description: second }
        });
      });
  }
}