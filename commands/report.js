const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Can't find the user!");
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send("Please enter reason... \n**Example:** \`\`report <mention user> <Reason>\`\`")

  let rEnbed = new Discord.RichEmbed()
  .setTitle("Report__")
  .setDescription(`This message is to report ${rUser.user.username}`)
  .setColor("#ff0000")
  // .setThumbnail(icon)
  .addField("Reported User", `${rUser.user.username}`)
  .addField("Reported User's ID", rUser.user.id)
  .addField("Time:", message.createdAt)
  .addField("Reported By", message.author.username)
  .addField("Reason", `${reason}`);

  let rChannel = message.guild.channels.find(`name`, "complains");
  if(!rChannel) return message.channel.send("Reporting channel not found!");

  message.delete().catch(O_o=>{});

  rChannel.send(`Reporter: <@${message.author.id}>\nReported User: <@${rUser.user.id}>`, rEnbed).then(() => {
    message.author.send(`${rUser.user.username} has been reported and is submitted to server Admins.`);
  });
}

module.exports.help = {
  name: "report"
}
