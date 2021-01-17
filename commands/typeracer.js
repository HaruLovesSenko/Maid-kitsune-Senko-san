const Discord = require("discord.js");
const command = require('/app/exports/commandClass.js')

module.exports = class typeracer extends command {
  constructor() {
    super("typeracer", "Play typeracer on discord!", "s?typeracer [user]")
  }
  
  run(msg, client, using) {
    require('/app/exports/typeracer/typeracer.js').run(msg, using)
  }
}