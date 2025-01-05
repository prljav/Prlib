//this example tells you back whatever you tell the bot
//import { Bot } from "prlib";      //use this if you installed the package via npm
import { Bot } from "../dist/index"; //use this if you are using the package from the dist folder

const bot = new Bot({
  auth: `{"cmd":"login","msg":{"name":"name","password":"pass","width":193,"height":33,"ttype":"play.proceduralrealms.com"},"reqId":"Prlib-demo"}`,
  debug: true,
  events: {
    "channel.msg": (packet: any) => {
      if (packet.msg.channel !== "tell") return
      bot.runCmd(`tell ${packet.msg.from} ${packet.msg.message}`)
    }
  }
})
bot.addEventListener("ready", console.log)