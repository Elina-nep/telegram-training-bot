import TelegramApi from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { allData } from "./database/database.js";
import {
  startUserBot,
  stopUserBot,
  stopButtonsProcess,
  getStatistics,
  addTrain,
  reactOnFile,
} from "./controllers/index.js";

const token = process.env.BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

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
    if (!allData[msg.chat.id]) {
      allData[msg.chat.id] = {};
    }

    try {
      switch (text) {
        case "/start": {
          return startUserBot(bot, msg, allData[msg.chat.id]);
        }
        case "/info": {
          console.log(msg);
          return bot.sendMessage(chatId, `Всё и так понятно, тупичка`);
        }
        case "/train": {
          return addTrain(bot, msg, allData[msg.chat.id]);
        }
        case "/food": {
          return bot.sendMessage(chatId, `Записываем еду`);
        }
        case "/stop": {
          return stopUserBot(bot, msg, allData[msg.chat.id]);
        }
        case "/statistics": {
          return getStatistics(bot, msg, allData[msg.chat.id]);
        }
        case "/forgive": {
          return bot.sendMessage(chatId, `Чьи долги ты хочешь простить?`);
        }
        case "/correct": {
          return bot.sendMessage(chatId, `За какую дату вносим исправления?`);
        }
        default:
          return;
      }
    } catch (e) {
      return bot.sendMessage(chatId, "Произошла какая то ошибочка!)");
    }
  });

  bot.on("photo", async (msg) => {
    reactOnFile(bot, msg, allData[msg.chat.id]);
  });
  bot.on("video", async (msg) => {
    reactOnFile(bot, msg, allData[msg.chat.id]);
  });

  bot.on("callback_query", async (buttonMsg) => {
    if (!allData[buttonMsg.message.chat.id]) {
      allData[buttonMsg.message.chat.id] = {};
    }
    stopButtonsProcess(bot, buttonMsg, allData[buttonMsg.message.chat.id]);
  });
};
