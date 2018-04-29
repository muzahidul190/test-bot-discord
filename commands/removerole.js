const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  if(args[0] == "help"){
    message.reply("Usage: \`\`rrole <user> <role>\`\`");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply(`${rMember.user.username} doesn't have ${gRole.name} role.`);
  await(rMember.removeRole(gRole.id));

  message.channel.send(`${gRole.name} role has been taken away from ${rMember.user.username}.`)

}

module.exports.help = {
  name: "rrole"
}
