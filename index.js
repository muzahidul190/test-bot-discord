const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const mysql = require("mysql");
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

let DB_HO = process.env.DB_HOST;
let DB_US = process.env.DB_USER;
let DB_PA =  process.env.DB_PASS;
let DB_NA = process.env.DB_NAME;

/*var con = mysql.createConnection({
  host: DB_HO,
  user: DB_US,
  password: DB_PA,
  database: DB_NA
});
con.connect(err => {
  if(err) throw err;
  console.log("Connected to the database!");
});*/
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity('Codes on PC', { type: 'WATCHING' })
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
  if(message.channel.type === "dm") return message.channel.send("Hey, What\'s up? I\'m still under construction. <@325510053970837505>(@Muzahidul190) is constructing me. Don\'t Dme now please.");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
  if(message == "invite"){
      return message.channel.send('The one and only direct invite link of the server is: https://discord.gg/crtrH5y');
  }  
  if(message == `mmc`){
    let mem = message.guild.memberCount;
    let botmem = message.guild.members.filter(m => m.user.bot).size;
    let memon = message.guild.members.filter(m => m.presence.status === "online").size;
    let memdnd = message.guild.members.filter(m => m.presence.status === "dnd").size;
    let memidl = message.guild.members.filter(m => m.presence.status === "idle").size;
    let memoff = message.guild.members.filter(m => m.presence.status === "offline").size;
    let humanmem = eval(mem - botmem);

    let rEnbed = new Discord.RichEmbed()
    .setTitle("Member Count:__")
    .setDescription(`Member Information of ${message.guild.name}`)
    .setColor("#ffa500")
    .addField("Total Member", `${mem}`)
    .addField("Human", humanmem)
    .addField("Bots :robot:", botmem)
    .addField("Members Online:", memon)
    .addField("Member dnd:", memdnd)
    .addField("Member Idle:", memidl);
    return message.channel.send(`Member Information`, rEnbed);
  }


});


// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
