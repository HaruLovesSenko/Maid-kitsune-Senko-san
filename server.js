const Discord = require("discord.js");
const db = require("ezpz.db");
const fs = require('fs')

const client = new Discord.Client();
const prefix = "s?";

db.connect(`mongodb+srv://Haru:${process.env.mongoP}@cluster0-whi8f.mongodb.net/MaidBot?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.commands = new Discord.Collection()

const Commands = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  try {
    const cmd = require(`./commands/${file}`);
    const command = new cmd()
    client.commands.set(command.constructor.name, command);
    Commands[command.constructor.name] = {Status: "✅"}
  } catch(e) {
    console.log(e)
  }
}

const Events = {}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  try {
    const event = require(`./events/${file}`);
    const eventName = file.split('.js')[0]
    client.on(eventName, (...args) => event(client, ...args))
    Events[eventName] = {Status: "✅"}
  } catch(e) {
    console.log(e)
  }
}

console.table(Commands);
console.table(Events);

client.login(process.env.token);

///////////////////////////////////
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("ONLINE!");
});

app.get("/typeracer/:p1/:p2", (req, res) => {
  let players = req.params;
  db.get(`${players.p1}_${players.p2}`).then(game => {
    res.send(require("./exports/typeracer/html.js")(game.num, game.words));
  });
});

app.listen(process.env.PORT);
///////////////////////////////////
