const {users , profiles} = require('../models');
const bcrypt = require('bcrypt');
const { returnUserId } = require('../services/jwt');

const getProfileInfo = async(req, res) =>{
    const userId = returnUserId(req);
    try{
        if (userId === null) {
            return res.status(403).json({error: 'Користувач не авторизований'});
        }

        const user = await users.findByPk(userId);
        const userProfile = await profiles.findOne({
            where: {user_id: userId}
    });

    if(!userProfile){
        const userData = {
            username : user.username,
            university : user.university,
            /* faculty : user.faculty */
        }
        return res.status(200).send(userData);
     }

    if(!user && !userProfile){
       return res.status(404).json({error : "Дані про користувача не знайдено"});
    }

    const userData = {
        username : user.username,
        first_name : userProfile.first_name,
        last_name : userProfile.last_name,
        status : userProfile.status,
        university : user.university,
        /* faculty : user.faculty */
    }
    console.log(user.university);
   return res.status(200).send(userData);

    }catch(error){
        console.log(error);
       return res.status(500).json(error);
    }
};

const editProfileInfo = async(req, res) =>{
    const userId = returnUserId(req);

    if(userId == null){
        return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
    }

    const newUserData = req.body;
    const updateData = {};
    try{
        const user = await users.findByPk(userId);
        const userProfile = await profiles.findOne({
            where: {user_id: userId}
        });
    
        if(!user || !userProfile){
            return res.status(404).json({error : "Профіль не знайдено"});
         }

         for (const key in newUserData) {
            if (newUserData[key] && (newUserData[key].trimLeft() == newUserData[key] && newUserData[key].trimRight() == newUserData[key])) {
                updateData[key] = newUserData[key];
            }
        }

        await users.update(updateData, {
            where: {id: userId}
        });

        await profiles.update(updateData, {
            where: {user_id: userId}
        });

        return res.status(200).json(updateData);

    }catch(error){
        return res.status(500).json({error: 'Внутрішня помилка сервера'});
    }
};


const deleteUser = async(req, res) =>{
    const userId = returnUserId(req);

    if(userId == null){
        return res.status(404).json({error: "Користувач не увійшов в аккаунт"});
    }

    const {reqPassword} = req.body;

    const user = await users.findByPk(userId);
    const profile = await profiles.findOne({
        where: {user_id : userId}
    });
    if(!user || !profile){
        return res.status(404).json({error: 'Користувача не знайдено'});
    }

    try {
       const result =  await bcrypt.compare(reqPassword, user.password);
       console.log(result);
       if(result){
            await user.destroy();
            await profile.destroy();
            return res.status(200).json({status:'success'});
       }
       else{
        return res.status(400).json({error: 'Паролі не співпадають'});
       }
    } catch (error) {
        return res.status(500).json({error: 'Внутрішня помилка сервера'});
    }
    
};

module.exports = {
    getProfileInfo,
    editProfileInfo,
    deleteUser
};

