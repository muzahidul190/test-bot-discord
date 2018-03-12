const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!clear 15
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, pal. You don\'t have permission to delete messeges.").then(msg => msg.delete(5000));
  if(!args[0]) return message.channel.send("Please enter ammount of messages to delete. Example \`\`clear 5\`\`").then(msg => msg.delete(5000));
  var num = eval(args[0] + "+" + 1);
  message.channel.bulkDelete(num).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
