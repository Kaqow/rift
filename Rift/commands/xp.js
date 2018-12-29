const Discord = require("discord.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtlvlxp = curlvl * 300;
  let difference = nxtlvlxp - curxp;

let member = message.mentions.users.first() || message.author;
  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setThumbnail(member.displayAvatarURL)
  .setColor("#d800ff")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP until level up`, message.author.displayAvitarURL);

  message.channel.send(lvlEmbed);
}

module.exports.help = {
  name: "level"
}
