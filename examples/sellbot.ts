//this example is a bit more complicated, but still easy to set up, just add/remove/modify the if conditions that fit your portal
//import { Bot } from "prlib";      //use this if you installed the package via npm
import { Bot } from "../dist/index"; //use this if you are using the package from the dist folder

const bot = new Bot({
  debug: true,
  auth: `{"cmd":"login","msg":{"name":"name","password":"password","width":193,"height":33,"ttype":"play.proceduralrealms.com"},"reqId":"Prlib-demo"}`,
  events: {
  }
})
bot.addEventListener("ready", () => {
  bot.addEventListener('update', () => {

    if (bot.botstate.x == 4 && bot.botstate.y == 14) bot.runCmd('travel 2')
    if (bot.botstate.x == 23 && bot.botstate.y == 26) {
      bot.runCmd('drop all')
      bot.runCmd('south')
    }
    if (bot.botstate.x == 23 && bot.botstate.y == 27) {
      bot.runCmd('get all')
      bot.runCmd('recall')
    }
    if (bot.botstate.x == 6 && bot.botstate.y == 14) {
      //selling sequence, does a circle around the nexus
      for (let i = 0; i < 3; i++) {
        bot.runCmd('e')
        bot.runCmd('sell all')
      }
      for (let i = 0; i < 7; i++) {
        bot.runCmd('n')
        bot.runCmd('sell all')
      }
      for (let i = 0; i < 6; i++) {
        bot.runCmd('w')
        bot.runCmd('sell all')
      }
      for (let i = 0; i < 7; i++) {
        bot.runCmd('s')
        bot.runCmd('sell all')
      }
      bot.runCmd('e')
      bot.runCmd('sell all')
    }
  })

})