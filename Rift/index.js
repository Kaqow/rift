const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let xp = require("./xp.json");
let cooldown = new Set();
let cdseconds = 5;
const prefix = '-';
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  };

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("with Rift", {type: "PLAYING"})
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    return message.reply("Please wait 5 seconds before using another command!")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let xpAdd = Math.floor(Math.random() * 7) + 10;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curLevel = xp[message.author.id].level;
  let nxtLevel = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;
  if(nxtLevel <= xp[message.author.id].xp){
    xp[message.author.id].level = curLevel + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#d800ff")
    .addField("New Level", curLevel + 1);

    message.channel.send(lvlup).then(message => {message.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

});

bot.login("NTI4MzUwNDE3NTYyNjMyMjAy.DwhDTw._LLvyIwI-p080napiEgbAF3aG0M");
