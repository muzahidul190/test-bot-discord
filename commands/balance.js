const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(message.channel.id !== `427944880170336289`) return message.channel.send(`\`\`bal\`\` command works only in <#427944880170336289> channel.`);
  let cUser = message.mentions.users.first() || message.author;
  let dUser = message.author.id;
  if(!cUser){
    cUser = dUser;
  }else{
    cUser = cUser;
  }
  //!coins
  if(!coins[cUser.id]){
    let cUser = message.mentions.users.first() || message.author;
    return message.channel.send(`Sorry ${cUser.username} doesn't have an account yet!`)
  }

  let uCoins = coins[cUser.id].coins;
  let tst = coins[cUser.id].time;

  if(uCoins === null) uCoins = 0;




  message.channel.send(`${cUser.username}\'s balance is **$${uCoins}**`);

}

module.exports.help = {
  name: "bal"
}
