const Discord = require('discord.js');

exports.run = async (bot, message, args, ops) => {

	if (!message.member.roles.find("name", "@everyone")) { //Whatever role you want, I pick @everyone because everyone can use this command
		message.channel.send('Invalid permissions.');
		return;
	}

let member = message.mentions.users.first() || message.author;
    if (!args[0]) return message.channel.send('Proper usage: -Poll <question>');

    // Create Embed
    const embed = new Discord.RichEmbed()
        .setColor("#d800ff")
        .setThumbnail(member.displayAvatarURL)
        .setFooter('React to Vote!')
        .setDescription(args.join(' '))
        .setTitle(`Poll Created By ${message.author.username}`);

    let msg = await message.channel.send(embed)
        .then(function (msg) {
            msg.react("✅");
            msg.react("❎");
            message.delete({timeout: 1000});
            }).catch(function(error) {
            console.log(error);
        });
};

module.exports.help = {
  name: "poll"
}
