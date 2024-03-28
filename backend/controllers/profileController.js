const {users , profiles} = require('../models');

const getProfileInfo = async(req, res) =>{
    const {userId} = req.body;
    try{
        const user = await users.findByPk(1);
        const userProfile = await profiles.findOne({
            where: {user_id: userId}
    });

    if(!user || !userProfile){
       return res.status(404).json({error : "Профіль не знайдено"});
    }
    const userData = {
        username : user.username,
        first_name : userProfile.first_name,
        last_name : userProfile.last_name,
        status : userProfile.status,
        universiry : user.university,
        /* faculty : user.faculty */
    }
   return res.status(200).send(userData);

    }catch(error){
        console.log(error);
       return res.status(500).json(error);
    }
};

const editProfileInfo = async(req, res) =>{
    const {userId} = req.body;
    const newUserData = req.body;
    try{
        const user = await users.findByPk(1);
        const userProfile = await profiles.findOne({
            where: {user_id: userId}
        });
    
        if(!user || !userProfile){
            return res.status(404).json({error : "Профіль не знайдено"});
         }

        await users.update(newUserData, {
            where: {id: userId}
        });

        await profiles.update(newUserData, {
            where: {user_id: userId}
        });

        return res.status(204).json({success: true});

    }catch(error){
        return res.status(500).json({error: 'Внутрішня помилка сервера'});
    }
};

module.exports = {
    getProfileInfo,
    editProfileInfo
};