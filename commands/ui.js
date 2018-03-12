const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let Usr = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(message.channel.name !== `bot-spamming`) return message.channel.send(`Do this in <#406715126864019456> channel only please.`).then(message => message.delete(5000));

  if(!Usr){
    let icon = message.author.displayAvatarURL;
    let Usr = message.author.username;
    let rEnbed = new Discord.RichEmbed()
    .setTitle("Profile:__")
    .setDescription(`Profile Information of ${message.author.username}`)
    .setColor("#ffa500")
    .setThumbnail(icon)
    .addField("User Name", `${message.author.username}`)
    .addField("User's ID", message.author.id)
    .addField("Joined This Server:", message.member.joinedAt)
    .addField("Joined Discord", message.author.createdAt);


    message.channel.send(`Profile Information of: <@${message.author.id}>`, rEnbed);
  }else{
    let icon = Usr.user.displayAvatarURL;

    let rEnbed = new Discord.RichEmbed()
    .setTitle("Profile:__")
    .setDescription(`Profile Information of ${Usr.user.username}`)
    .setColor("#ffa500")
    .setThumbnail(icon)
    .addField("User Name", `${Usr.user.username}`)
    .addField("User's ID", Usr.user.id)
    .addField("Joined This Server:", Usr.guild.joinedAt)
    .addField("Joined Discord", Usr.user.createdAt)
    .setFooter(`Query by: ${message.author.username}`);

    message.channel.send(`Profile Information of: ${Usr.user.username}`, rEnbed);
  }
}

module.exports.help = {
  name: "user"
}
