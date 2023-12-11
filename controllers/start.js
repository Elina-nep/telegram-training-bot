import { UserData } from "../database/userData.js";

export const startUserBot = async (bot, msg, chatData) => {
  if (chatData[msg.from.id] && chatData[msg.from.id].active) {
    return bot.sendMessage(
      msg.chat.id,
      `Привет! Это я, твой бот помощник! Я уже записываю твою активность, не волнуйся`,
    );
  } else if (chatData[msg.from.id]) {
    chatData[msg.from.id].active = true;
    chatData[msg.from.id].lastTrain = null;
    return bot.sendMessage(
      msg.chat.id,
      `Привет! Это я, твой бот помощник! Я рад, что ты снова со мной!`,
    );
  }
  chatData[msg.from.id] = new UserData(msg.from.id, msg.from.username, true);
  await bot.sendSticker(
    msg.chat.id,
    "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/2.webp",
  );
  return bot.sendMessage(
    msg.chat.id,
    `Привет! Это я, твой бот помощник! Давай начнем тренироваться вместе!`,
  );
};
