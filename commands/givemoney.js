const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(message.channel.id !== `427944880170336289`) return message.channel.send(`\`\`give\`\` command works only in <#427944880170336289> channel.`);

  if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  
    if(!args[0] || !args[1]) return message.channel.send(`Write in this formate...\n\`\`give <@mention receiver> <Amount>\`\``);

  if(!coins[pUser.id]){
     return message.channel.send(`Sorry, The receiver \(${pUser.user.username}\) don\'t have an account. Ask him to open a bank account by typing \`\`bankregister\`\` in <#427944880170336289> first. Then try to donate him.`);
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  let stod = coins[message.author.id].time;
  let stor = coins[pUser.id].time;

  if(sCoins < args[1]) return message.reply("Not enough Balance there!");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1]),
    time: stod
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1]),
    time: stor
  };

  return message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`).then(() => {
      fs.writeFile("./coins.json", JSON.stringify(coins, null, 2), (err) => {
       if(err) cosole.log(err)
      });
  });


}

module.exports.help = {
  name: "give"
}
