const Discord = require("discord.js");
const client = new Discord.bot();

bot.on('ready', () => {
  console.log("Logged in as ${bot.user.tag}!");
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
