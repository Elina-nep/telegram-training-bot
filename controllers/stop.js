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

export const stopUserBot = async (bot, msg, chatData) => {
  if (chatData[msg.from.id] && chatData[msg.from.id].active) {
    await bot.sendSticker(
      msg.chat.id,
      "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/8.webp",
    );
    await bot.sendMessage(
      msg.chat.id,
      `Правда хочешь приостановить наше общение?`,
      stopOptions,
    );
    return;
  }
  return bot.sendMessage(msg.chat.id, `Мы и так не общаемся`);
};

export const stopButtonsProcess = async (bot, buttonMsg, chatData) => {
  if (chatData[buttonMsg.from.id] && chatData[buttonMsg.from.id].active) {
    switch (buttonMsg.data) {
      case "yesToStop": {
        chatData[buttonMsg.from.id].active = false;
        const daysMissed = chatData[buttonMsg.from.id].calcDebt(
          new Date().setHours(0, 0, 0, 0),
        );
        await bot.sendSticker(
          buttonMsg.message.chat.id,
          "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/256/13.webp",
        );
        return bot.sendMessage(
          buttonMsg.message.chat.id,
          `Жаль, возвращайся! ${
            daysMissed ? "Ты пропустил тренировку, записан долг" : ""
          }`,
        );
      }

      case "noToStop": {
        await bot.sendSticker(
          buttonMsg.message.chat.id,
          "https://tlgrm.ru/_/stickers/76b/77d/76b77dbb-5b99-39f3-904f-ca92ba9af20b/10.webp",
        );
        return bot.sendMessage(
          buttonMsg.message.chat.id,
          `Рад, что ты передумала`,
        );
      }

      default:
        return bot.sendMessage(
          buttonMsg.message.chat.id,
          `не понял, попробуй ещё раз`,
        );
    }
  }
};
