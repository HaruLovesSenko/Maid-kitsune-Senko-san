const fetch = require('node-fetch');

class TenorSearch {
  constructor(query) {
    this.query = query
  }
  
  sendGif(msg, msg2, user, i) {
    if (!user)
      return msg.channel.send({
        embed: {
          description: "You cant " + i + " nobody... :(",
          color: "RED"
        }
      });
    if (user.id == msg.author.id)
      return msg.channel.send({
        embed: {
          description: "You cant " + i + " yourself... :(",
          color: "RED"
        }
      });
    fetch(`https://api.tenor.com/v1/search?key=${process.env.tenorKey}&q=${this.query}`)
    .then(res => res.json())
    .then(json => {
      let a = json.results[Math.floor(Math.random()*json.results.length)]
      msg.channel.send({embed: {
        description: msg2,
        color: "ORANGE",
        image: {
          url: a.media[0].gif.url
        }
      }})
    })
  }
}

module.exports = TenorSearch