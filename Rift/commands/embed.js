const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You got no permissions fam!").then(message => {message.delete(5000)});

      const sayMessage = args.join(" ");

      let servIcon = message.guild.iconURL;
      let esayEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor("#d800ff")
      .setThumbnail(servIcon)
      .setDescription(`${sayMessage}`)
      .setFooter(`© Rift | By Kapow`);

      const esayMessage = args.join(" ");
      // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
      message.delete().catch(O_o=>{});
      // And we get the bot to say the thing:

      message.channel.send(esayEmbed);
  };

  module.exports.help = {
    name: "embed"
  }
