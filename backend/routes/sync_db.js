const { users, verificationCodes, profiles, events, eventImages, eventParticipants, userBookmarks, pendingFriendRequests, friends, comments, ratings } = require("../models");

async function syncModels() {
    try {
        await users.sync({ force: true });
        // await verificationCodes.sync({ force: true });
        // await profiles.sync({ force: true });
        await events.sync({ force: true });
        // await eventImages.sync( { force: true })
        // await eventParticipants.sync( { force: true })
        // await userBookmarks.sync({ force: true });
        // await pendingFriendRequests.sync({ force: true });
        // await friends.sync({ force: true });
        // await comments.sync({ force: true });
        // await ratings.sync({ force: true });
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