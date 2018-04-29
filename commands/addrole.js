const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Ask an Admin or Mod to do this operation.");
  if(args[0] == "help"){
    message.reply("Usage: addrole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user(!).");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply(`${rMember.user.username} already has that role.`);
  await(rMember.addRole(gRole.id));

  message.channel.send(`Congrats to ${rMember.user.username}, ${gRole.name} role has been added to your profile.`);
}

module.exports.help = {
  name: "addrole"
}
