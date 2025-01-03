# Prlib
```bash
npm install Prlib
```
### Packet docs will (hopefully) come soon

in order to get the "auth" string you need to copy the first packet your client sends to the server, will look like

```
{"cmd":"login","msg":{"name":"your username","password":"your plaintext password","width":193,"height":33,"ttype":"play.proceduralrealms.com"},"reqId":"this does not matter"}
```

or

```
{"cmd":"token","msg":{"name":"Prljav","token":"Some text here","width":127,"height":33,"ttype":"play.proceduralrealms.com"},"reqId":"this does not matter"}
```

#### How to compile?

just do `tsc {file name}`

# TODO

The changes are sorted by priority, the first one being highest and the last lowest.

- [x] Add a websocket server, allowing for the official web client to connect to the bot and make debugging and controling the bot much easier.
- [ ] Publish to NPM.
- [x] Keep the state of the bot, where it's at, it's food, stamina and similar. (stamina and food not done, but the coords and region are)
- [ ] Add a better way to run popular commands, movement and chatting.
- [ ] Easier way for making commands, maybe even built-in?

# FAQ
How do i use the debugging feature?
1. Set up a proxy between you and PR, you want to degrade the connection to a HTTP one, so that you can connect to non secure websocket servers. (can be done extremely easy with Caddy, look it up ) (you can also do it by self hosting [the client](https://github.com/dinchak/procrealms-web-client/) yourself, but its easier to just proxy the official one)
2. Make sure you enabled the debug flag when defining the bot.
3. After that go to your proxied PR web client and open your dev console and go on the Network tab.
4. Refresh the tab and click on the websocket connection that opened (if you cant find it select the WS filter)
5. Go to the "Initiator" tab and select the highest function in the "Request call stack" (click on the index-....js:numbers)
6. Enable local overrides, this depends on the browser but is usually very simple to do.
7. Replace `new window.WebSocket(b),` with `new window.WebSocket("ws://localhost:8008"),`.
8. Refresh your tab and login as any account in your list.
9. You are done, now you and your bot are on the same client, you can play manually while your bot can work and do things, or you can just monitor and debug the bot much easier since you have a whole UI.
## Credits:
big thanks to the PR devs for making the [web client](https://github.com/dinchak/procrealms-web-client/) open source, allowing me to make the live debugging feature muuuch more easily