const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("This user is IMMUNE!");
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!wUser) return message.reply("You did not tag a valid user!")
if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user is IMMUNE!");
let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

 warns[wUser.id].warns++;

 fs.writeFile("./warnings.json", JSON.stringify(warns), (err)=> {
   if (err) console.log(err);
 });

 let warnEmbed = new Discord.RichEmbed()
  .setDescription("~Warns~")
  .setAuthor(message.author.username)
  .setColor("#d800ff")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason)
  .setFooter(`© Rift | By Kapow`);

  let warnchannel = message.guild.channels.find(`name`, "logs");
  if(!warnchannel) return message.reply("Logs Channel not found.").then(message => {message.delete(5000)});

   if(warns[wUser.id].warns == 2){
     let muterole = message.guild.roles.find(`name`, "muted");
     if(!muterole) return message.reply("You should make a muted role!").then(message => {message.delete(5000)});

     let mutetime = "30m";
     await(wUser.addRole(muterole.id));
     message.channel.send(`${wUser.id} has been temporarily muted for 30 minutes.`);

     setTimeout(function(){
       wUser.removeRole(muterole.id)
       message.reply(`${wUser.id} has been unmuted.`)
     }, ms(mutetime))
   }

  message.delete().catch(O_o=>{});
  warnchannel.send(warnEmbed);

  return message.channel.send("User has been **Warned**.").then(message => {message.delete(5000)});
}

module.exports.help = {
  name: "warn"
}
