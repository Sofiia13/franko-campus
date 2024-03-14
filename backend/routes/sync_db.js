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


//
//Цей файл використовується для простої перевірки змін у базі даних та/або
//синхронізації локального файлу config.json з хмарною БД supabase
//
//Для оновлення бази даних потрібно запускати файл командою
//node sync_db.js
//