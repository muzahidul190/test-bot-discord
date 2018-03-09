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
    
    if (cmd === 'frn') {
        return message.channel.sendMessage('I am alive.').then(message => message.delete(5000));  	
    }
    if(cmd == 'qwerty'){
        return message.reply('Are you on your keyboard?');
    }
    if(cmd === 'clr'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Sorry, you do not have permission.');
        message.channel.bulkDelete(3).then(() => {
            message.channel.sendMessage('3 messages deleted.').then(message => message.delete(5000));
        });
    }
    if(cmd == 'invite'){
        return message.channel.send('Invitation link is https://discord.gg/crtrH5y');
    }
    if(cmd == 'help'){
        return message.channel.send('<@325510053970837505> is still constructing me. ``Help`` menu will be added **soon**.');
    }
});
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Oops, you dont have permission.');
    if(!args[0]) return message.channel.send('Oops!');
    message.channel.bulkDelete(args[0]);
}
module.exports.help = {
    name: "clear"
}

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
