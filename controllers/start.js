import { allData } from "../database/database.js";

export const startUserBot = async (bot, msg) => {
  await bot.sendSticker(
    msg.chat.id,
    "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/2.webp",
  );
  if (allData[msg.from.id] && allData[msg.from.id].active) {
    return bot.sendMessage(
      msg.chat.id,
      `Привет! Это я, твой бот помощник! Я уже записываю твою активность, не волнуйся`,
    );
  } else if (allData[msg.from.id]) {
    allData[msg.from.id].active = true;
    return bot.sendMessage(
      msg.chat.id,
      `Привет! Это я, твой бот помощник! Я рад, что ты снова со мной!`,
    );
  }
  allData[msg.from.id] = {};
  allData[msg.from.id].active = true;
  return bot.sendMessage(
    msg.chat.id,
    `Привет! Это я, твой бот помощник! Давай начнем тренироваться вместе!`,
  );
};
