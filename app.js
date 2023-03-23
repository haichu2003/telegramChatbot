require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const ChatGPTService = require("./service/chatgpt.service");
const DbService = require("./service/db.service");

const teleggramToken = process.env.TELEGRAM_KEY;

DbService.connect().then(() => {
    const bot = new TelegramBot(teleggramToken, { polling: true });
    bot.on("message", async (msg) => {
        const authorId = msg.from.id;
        const chatId = msg.chat.id;
        const chatMsg = msg.text;
        const user = await DbService.getUserByTelegramId(authorId);
        ChatGPTService.generateCompletion(chatMsg, user).then((responseMsg) => {
            bot.sendMessage(chatId, responseMsg);
        });
    });
});
