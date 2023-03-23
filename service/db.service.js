const mongoose = require("mongoose");
const User = require("../models/user.model");
const Message = require("../models/message.model");

class DbService {
    connection;
    async connect() {
        mongoose.set("strictQuery", true);
        this.connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }

    async getUserByTelegramId(telegramId) {
        let user = await User.findOne({
            telegramId,
        });
        if (!user) {
            user = await User.create({
                telegramId,
            });
        }
        return user;
    }

    async getUserMessages(userId) {
        return Message.find({
            user: userId,
        });
    }

    async createNewMessage(user, userMessage, botMessage) {
        return Message.create({
            user: user._id,
            userMessage,
            botMessage,
        });
    }

    async clearUserMessage(userId) {
        return Message.deleteMany({
            user: userId,
        });
    }
}

module.exports = new DbService();
