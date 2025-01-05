//this example moves north when you tell it "n" and whenever it moves it sends you the bot state
//import { Bot, BotState } from "prlib";      //use this if you installed the package via npm
import { Bot, BotState } from "../dist/index"; //use this if you are using the package from the dist folder

const YOUR_MAIN_ACCOUNT_USERNAME = "enter your main account username (the one you will control the bot from)"
const bot = new Bot({
  auth: `{"cmd":"login","msg":{"name":"your name","password":"password here","width":193,"height":33,"ttype":"play.proceduralrealms.com"},"reqId":"Prlib-demo"}`,
  debug: true,
  events: {
    "channel.msg": (packet: any) => {
      if (packet.msg.message === "n" && packet.msg.from === YOUR_MAIN_ACCOUNT_USERNAME) bot.runCmd('n')

      bot.runCmd(`tell ${packet.msg.from} ${packet.msg.message}`)
    },
  }
})
bot.addEventListener("ready", () => {
  bot.addEventListener('update', (botstate: BotState) => {
    bot.runCmd(`tell ${YOUR_MAIN_ACCOUNT_USERNAME} x: ${botstate.x}, y: ${botstate.y}, region: ${botstate.region}`)
  })
})