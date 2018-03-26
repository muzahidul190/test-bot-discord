const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  console.log(`working!!`);
  if(message.channel.id !== `427942470932758528`) return message.channel.send(`\`\`payday\`\` command works only in <#427942470932758528> channel.`);
  
  let cooldown = 28800000;
  let amount = 250;

  if(!coins[message.author.id]) return message.channel.send(`Please type \`\`bankregister\`\` to open an account.`);

  let lastDaily = coins[message.author.id].time;

  // return message.channel.send(`${lastDaily.hours} ${lastDaily.minutes}`);
  // message.react(`💰`);

  if((lastDaily !== null) && (cooldown - (Date.now() - lastDaily) > 0)){
    let rtime = cooldown - (Date.now() - lastDaily);

    var rem = eval(rtime % 1000);
    var wr = eval(rtime - rem);
    var sec = eval(wr / 1000);
    var fsec = eval(sec % 60);//Finan Second....
    var wsecr = eval(sec - fsec);
    var min = eval(wsecr / 60);
    var fmin = eval(min % 60);//Final Minute....
    var wminr = eval(min - fmin);
    var fhur = eval(wminr / 60);//Final Hour.....

    message.channel.send(`You already collected your reward! Please wait **${fhur}h ${fmin}m ${fsec}s**`);
  }else{
    return message.channel.send(`Successfully collected $${amount}`).then(() => {
      let ccoins = coins[message.author.id].coins;
      coins[message.author.id] = {
        coins: ccoins + 250,
        time: Date.now()
      }
      fs.writeFile("./coins.json", JSON.stringify(coins, null, 2), (err) => {
        if(err) console.log(err);
      });
    });
  }
}

module.exports.help = {
  name: "pd",
  name: "payday"
}
