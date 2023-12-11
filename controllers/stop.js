import { allData } from "../database/database.js";

const stopOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Да", callback_data: "yesToStop" },
        { text: "Нет", callback_data: "noToStop" },
      ],
    ],
  }),
};

export const stopUserBot = async (bot, msg) => {
  if (allData[msg.from.id] && allData[msg.from.id].active) {
    await bot.sendSticker(
      msg.chat.id,
      "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/256/13.webp",
    );
    return bot.sendMessage(
      msg.chat.id,
      `Правда хочешь приостановить наше общение?`,
      stopOptions,
    );
  }
  return bot.sendMessage(msg.chat.id, `Мы и так не общаемся`);
};
