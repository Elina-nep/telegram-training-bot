import TelegramApi from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { allData } from "./database/database.js";
import { startUserBot, stopUserBot } from "./controllers/index.js";

const token = process.env.BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Играть еще раз", callback_data: "/again" }]],
  }),
};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`,
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Отгадывай", gameOptions);
};

export const start = async () => {
  bot.setMyCommands([
    { command: "/start", description: "Начать работать над собой" },
    { command: "/info", description: "Получить информацию о работе с ботом" },
    { command: "/train", description: "Записать тренировку" },
    { command: "/food", description: "Записать питание" },
    { command: "/stop", description: "Приостановить работу с ботом" },
    { command: "/statistics", description: "Получить свою статистику" },
    { command: "/forgive", description: "Списать долги" },
    { command: "/correct", description: "Исправить запись за предыдущие даты" },
    // { command: "/correct", description: "Настройки времени и " },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    try {
      switch (text) {
        case "/start": {
          return startUserBot(bot, msg);
        }
        case "/info": {
          console.log(msg);
          return bot.sendMessage(chatId, `Всё и так понятно, тупичка`);
        }
        case "/train": {
          bot.sendMessage(chatId, `Записываем тренировку`);
          return startGame(chatId);
        }
        case "/food": {
          return bot.sendMessage(chatId, `Записываем еду`);
        }
        case "/stop": {
          return stopUserBot(bot, msg);
        }
        case "/statistics": {
          return bot.sendMessage(chatId, `Вот твоя статистика`);
        }
        case "/forgive": {
          return bot.sendMessage(chatId, `Чьи долги ты хочешь простить?`);
        }
        case "/correct": {
          return bot.sendMessage(chatId, `За какую дату вносим исправления?`);
        }
        default:
          bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз!)");
      }
    } catch (e) {
      return bot.sendMessage(chatId, "Произошла какая то ошибочка!)");
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      await bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадал цифру ${chats[chatId]}`,
        againOptions,
      );
    } else {
      await bot.sendMessage(
        chatId,
        `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`,
        againOptions,
      );
    }
  });
};
