const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(message.channel.id !== `427944880170336289`) return message.channel.send(`\`\`give\`\` command works only in <#427944880170336289> channel.`);

  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  let stod = coins[message.author.id].time;
  let stor = coins[pUser.id].time;

  if(sCoins < args[0]) return message.reply("Not enough coins there!");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1]),
    time: stod
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1]),
    time: stor
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);

  fs.writeFile("./coins.json", JSON.stringify(coins, null, 2), (err) => {
    if(err) cosole.log(err)
  });


}

module.exports.help = {
  name: "give"
}
