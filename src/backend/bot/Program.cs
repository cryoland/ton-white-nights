﻿using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using System.Text.Json;
using Telegram.Bot.Types.ReplyMarkups;
using System;

class Program
{
    private static ITelegramBotClient _botClient;
    private static ReceiverOptions _receiverOptions;
    private static JsonSerializerOptions _serializerOptions = new JsonSerializerOptions
    {
        MaxDepth = 7,
        WriteIndented = true,
    };
    private static int _locationsAccepted = 0;

    static async Task Main(string[] args)
    {
        string? bot_token = Environment.GetEnvironmentVariable("TG_BOT_TOKEN");
        if (string.IsNullOrEmpty(bot_token)) throw new ArgumentNullException("bot_token", "TG_BOT_TOKEN value not provided!");

        _botClient = new TelegramBotClient(bot_token);
        _receiverOptions = new ReceiverOptions // Также присваем значение настройкам бота
        {
            AllowedUpdates = new UpdateType[]
            {
                UpdateType.Message,
                UpdateType.EditedMessage,
            },
            ThrowPendingUpdates = true,           
        };

        using var cts = new CancellationTokenSource();

        _botClient.StartReceiving(UpdateHandler, ErrorHandler, _receiverOptions, cts.Token);
        
        var me = await _botClient.GetMeAsync();
        Console.WriteLine($"{me.FirstName} started!");

        await Task.Delay(-1); // Устанавливаем бесконечную задержку, чтобы наш бот работал постоянно
    }

    // UpdateHander - обработчик приходящих Update`ов
    private static async Task UpdateHandler(ITelegramBotClient botClient, Update update, CancellationToken cancellationToken)
    {
        try
        {
            switch (update.Type)
            {
                case UpdateType.Message:
                    {
                        IReplyMarkup? markup = default;

                        if (update.Message?.Type == MessageType.Location)
                        {
                            Console.WriteLine("location: \n" + JsonSerializer.Serialize(update.Message.Location, _serializerOptions) + $" {DateTimeOffset.Now}");

                            if (!update.Message.Location!.LivePeriod.HasValue)
                            {
                                if (_locationsAccepted == 0)
                                {
                                    Interlocked.Increment(ref _locationsAccepted);

                                    // два варианта: либо нужно добираться, либо уже на месте. пока 2 вариант рассмотрим:
                                    await _botClient.SendTextMessageAsync(
                                        chatId: update.Message.Chat.Id,
                                        text: "(Найден ближайший маршрут: [Отсюда и до фонтана])\nВы на месте! Поделитесь live location, чтобы начать прохождение.\nПо истечении времени просто пришлите новый live location :)",
                                        replyMarkup: markup,
                                        cancellationToken: cancellationToken);
                                }
                            }
                            else
                            {
                                markup = new InlineKeyboardMarkup(new InlineKeyboardButton(text: "Начать")
                                {
                                    Url = $"https://t.me/ton_white_nights_bot/quests?username={update.Message.Chat.FirstName}&chatId={update.Message.Chat.Id}"
                                });
                                await _botClient.SendTextMessageAsync(
                                                    chatId: update.Message.Chat.Id,
                                                    text: "Маршрут [Отсюда и до фонтана] запущен!",
                                                    replyMarkup: markup,
                                                    cancellationToken: cancellationToken);
                            }
                        }

                        if (update.Message?.Type == MessageType.Text)
                        {
                            if (update.Message.Text == "/start")
                            {
                                markup = new ReplyKeyboardMarkup
                                (
                                    new KeyboardButton(text: "Отправить геопозицию")
                                    {
                                        RequestLocation = true
                                    }
                                )
                                {
                                    ResizeKeyboard = true
                                };

                                await _botClient.SendTextMessageAsync(
                                    chatId: update.Message.Chat.Id,
                                    text: "Добро пожаловать в TON White Nights!\nПоделитесь с ботом текущей геопозицией и мы подберем вам ближайшее к вам начало offline-квеста",
                                    replyMarkup: markup,                                    
                                    cancellationToken: cancellationToken);
                                return;
                            }
                            Console.WriteLine("text:\n" + update.Message.Text);
                        }
                        return;
                    }

                case UpdateType.EditedMessage:
                    {
                        if (update.EditedMessage?.Type == MessageType.Location)
                        {
                            Console.WriteLine("location edited: \n" + JsonSerializer.Serialize(update.EditedMessage.Location, _serializerOptions) + $"{DateTimeOffset.Now}");
                        }

                        if (update.EditedMessage?.Type == MessageType.Text)
                        {
                            Console.WriteLine("text edited:\n" + update.EditedMessage.Text);
                        }

                        return;
                    }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
    }

    private static Task ErrorHandler(ITelegramBotClient botClient, Exception error, CancellationToken cancellationToken)
    {
        var ErrorMessage = error switch
        {
            ApiRequestException apiRequestException
                => $"Telegram API Error:\n[{apiRequestException.ErrorCode}]\n{apiRequestException.Message}",
            _ => error.ToString()
        };

        Console.WriteLine(ErrorMessage);
        return Task.CompletedTask;
    }
}