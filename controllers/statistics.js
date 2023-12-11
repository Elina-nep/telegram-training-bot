export const getStatistics = async (bot, msg, chatData) => {
  if (chatData[msg.from.id] && chatData[msg.from.id].active) {
    const date = chatData[msg.from.id].lastTrain
      ? new Date(chatData[msg.from.id].lastTrain).toLocaleDateString()
      : "нет записи";

    return bot.sendMessage(
      msg.chat.id,
      `Вот твоя статистика, @${chatData[msg.from.id].name}:
      всего тренировок: ${chatData[msg.from.id].trains},
      пропущено занятий: ${chatData[msg.from.id].missed},
      твои долги: ${chatData[msg.from.id].debt},
      последняя тренировка: ${date}
      `,
    );
  }

  return bot.sendMessage(
    msg.chat.id,
    `Твоя работа с ботом приостановлена, введи /start чтобы снова начать тренировки`,
  );
};
