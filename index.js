const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  //bot.user.setGame("Getting Coded on GitHub");
  bot.user.setActivity('Codes on GitHub', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("Hey, What\'s up? I\'m still under construction. Don\'t DM me now.");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}bott`){
    return message.channel.send("Hello!");
  }
  if(cmd == 'invitelink'){
        return message.channel.send('Invitation link is https://discord.gg/crtrH5y');
}
});


// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
