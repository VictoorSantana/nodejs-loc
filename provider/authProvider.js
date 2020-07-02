const filter = require('../helpers/filterValidation');
const { AuthPosts } = require('../helpers/reponsePosts');

const model = require('../models/authModel');

const { SECRET_KEY, SECRET_KEY_EXPIRES, INITIAL_ID } = require('../props/setup');
const jwt = require('jsonwebtoken');

module.exports = {

    tryLogin: async (data) => {
        let _token = '';
        const temp = {
            username: filter.common(data.username),
            password: filter.common(data.password),
        };

        const result = await model.findAll({
            where: {
                username: temp.username, 
                password:  temp.password
            }
        });
        
        if(filter.hasRecords(result)) {
            _token = jwt.sign({ _id: INITIAL_ID + result[0].id }, SECRET_KEY, {
                expiresIn: SECRET_KEY_EXPIRES
            });
        }        

        return {
            fail: !filter.hasRecords(result),
            message: filter.hasRecords(result) ? [AuthPosts.ALLOWED] : [AuthPosts.WRONG_PASSWORD],
            records: [_token]
        };                  

    },

    findUserId: async (data) => {        
        const _id = data.id;

        const result = await model.findAll({
            attributes: ['username'],
            where: {
                id: _id,                 
            }
        });

        return {
            fail: !filter.hasRecords(result),
            message: filter.hasRecords(result) ? [AuthPosts.ALLOWED] : [AuthPosts.WRONG_PASSWORD],
            records: result
        };  
        
    }

}