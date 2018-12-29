const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Cant find user!").then(message => {message.delete(5000)});
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You got no permissions fam!").then(message => {message.delete(5000)});
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person is IMMUNE!").then(message => {message.delete(5000)});

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#d800ff")
  .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time Banned", message.createdAt)
  .addField("Reason Banned", bReason)
  .setFooter(`© Rift | By Kapow`);

  let banChannel = message.guild.channels.find( bans => bans.name === "logs")
  if(!banChannel) return message.guild.channels.find( reports => reports.name === "Logs Channel not found.").then(message => {message.delete(5000)});

  message.delete().catch(O_o=>{});
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);


return message.channel.send("User has been **Banned** from the server! :O").then(message => {message.delete(5000)});
}

module.exports.help = {
  name: "ban"
}
