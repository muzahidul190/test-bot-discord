const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(message.channel.id !== `427944880170336289`) return message.channel.send(`\`\`bankregister\`\` command works only in <#427944880170336289> channel.`);

  if(!coins[message.author.id]){
    return message.channel.send(`Congratulations <@${message.author.id}>, your account is opened Successfully!`).then(() => {
      coins[message.author.id] = {
        coins: 5000,
        time: Date.now()
      }
      fs.writeFile("./coins.json", JSON.stringify(coins, null, 2), (err) => {
        if(err) cosole.log(err)
      });
    });
  }else{
    return message.channel.send(`${message.author.username}, you are already registered!`)
  }

}

module.exports.help = {
  name: "bankregister"
}
