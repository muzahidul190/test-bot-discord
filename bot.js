const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', async () => {
    console.log('I am ready!');
    bot.user.setActivity("Getting Constructed", {type: "WATCHING"});
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm"){
        return message.reply('Don\'t DM me now. I\'m still a kid :cold_sweat:');
    }
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    if (cmd === 'bott') {
        return message.channel.sendMessage('Testing bot');  	
    }
    
});

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
