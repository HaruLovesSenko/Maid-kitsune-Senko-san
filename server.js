const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("ezpz.db");
const fs = require('fs')

const prefix = "s?"

db.connect(`mongodb+srv://Haru:${process.env.mongoP}@cluster0-whi8f.mongodb.net/MaidBot?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
  const command = new cmd()
	client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
  const eventName = file.split('.js')[0]
  client.on(eventName, (...args) => event(client, ...args))
}

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
    res.send(require("/app/exports/typeracer/html.js")(game.num, game.words));
  });
});

app.listen(process.env.PORT);
///////////////////////////////////
