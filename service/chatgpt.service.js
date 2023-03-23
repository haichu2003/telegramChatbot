const { Configuration, OpenAIApi } = require("openai");
const DbService = require("./db.service");

class ChatGPTService {
    roleplayIntroduction = `As a specialist named bot, chat with user about their question in a professional yet user-friendly voice`;

    async generateCompletion(prompt, user) {
        const oldMessage = await DbService.getUserMessages(user._id);

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
        });
        const openai = new OpenAIApi(configuration);

        let fullPrompt = this.roleplayIntroduction + "\n\n";

        if (oldMessage && oldMessage.length > 0) {
            for (let message of oldMessage) {
                fullPrompt += `User: ${message.userMessage}\n`;
                fullPrompt += `Bot: ${message.botMessage}\n`;
            }
        }

        fullPrompt += `User: ${prompt}`;
        fullPrompt += `Bot: `;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: fullPrompt,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const responMessage = completion.data.choices[0].text.replace(/^\s+|\s+$/g, "");
        await DbService.createNewMessage(user, prompt, responMessage);
        return responMessage;
    }
}
module.exports = new ChatGPTService();
