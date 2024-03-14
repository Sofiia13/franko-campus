const { users, verificationCodes, profiles, events } = require("../models");

async function syncModels() {
    try {
        await users.sync({ force: true });
        await verificationCodes.sync({ force: true });
        await profiles.sync({ force: true });
        await events.sync({ force: true });
    } catch (error) {
        console.error("Error syncing models:", error);
    }
}

syncModels(); 


// users.create({
//     username: "test_username",
//     password: "test_hashedPassword",
//     email: "test_email",
//     university: "test_university",
//     is_verified: "false"
//   });

//
//Цей файл використовується для простої перевірки змін у базі даних та/або
//синхронізації локального файлу config.json з хмарною БД supabase
//
//Для оновлення бази даних потрібно запускати файл командою
//node test.js з розкоментованою лише однією командою синхронізації таблиці
//у порядку згори донизу.
//
//Наприклад, станом на 08.03 БД налічує 2 таблиці, users та verificationCodes
//для оновлення структури цих таблиць застосувати наступний алгоритм:
//розкоментувати users.sync, виконати файл (verifCodes.sync повинно бути закоментованим!)
//після виконання закоментувати users.sync, розкоментувати verifCodes.sync, виконати.
//
//Або не морочте голову і залиште це Саші.
//
//