export const addTrain = async (bot, msg, chatData) => {
  if (chatData[msg.from.id] && chatData[msg.from.id].active) {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if (
      !chatData[msg.from.id].lastTrain ||
      chatData[msg.from.id].lastTrain < currentDate
    ) {
      chatData[msg.from.id].waitingTrain = true;
      return bot.sendMessage(msg.chat.id, `Пришли фото или видео пруф`);
    }

    return bot.sendMessage(
      msg.chat.id,
      `Тренировка за этот день уже записана!`,
    );
  }

  return bot.sendMessage(
    msg.chat.id,
    `Твоя работа с ботом приостановлена, введи /start чтобы начать тренировки`,
  );
};

export const reactOnFile = async (bot, msg, chatData) => {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  if (chatData[msg.from.id] && chatData[msg.from.id].waitingTrain) {
    await bot.sendMessage(msg.chat.id, `Записал тренировку`);
    const period = chatData[msg.from.id].addTrain(currentDate);
    if (period >= 1) {
      return bot.sendMessage(
        msg.chat.id,
        `Кажется, ты пропустил занятие. Добавлен долг (${period} шт.)`,
      );
    }
    return;
  }
};
