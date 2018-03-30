const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  let target = message.mentions.users.first() || message.author;

  con.query(`SELECT * FROM users WHERE sid = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send(`${target.username} doesn\'t have a bank account!`);

    let xp = rows[0].credit;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(target.username)
    .setColor("#00FF00")
    .addField("💰", xp)
    .addField("Testing", `Hello`);


    message.channel.send(coinEmbed);
  });
}

module.exports.help = {
  name: "bal"
}
