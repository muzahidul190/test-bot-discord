const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find Commands!");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded successfully!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity('Codes on GitHub', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
  bot.user.setStatus('idle');
});
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Hey ${member},\nWelcome to **A Tour to the Universe**, \nPlease go to <#406136263977205760> to get all *self-assignable* roles. And Certainly, These *self-assignable* roles will help you to get access to many important lounges which are currently :lock: locked to you.`);
});
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`HuH!!! ${member.user.username},S/He left us!\nCertainly s/he is going to miss us a lot.`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("Hey, What\'s up? I\'m still under construction. Don\'t DM me now.");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

});


// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
