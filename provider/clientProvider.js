const filter = require('../helpers/filterValidation');
const model = require('../models/clientModel');

module.exports = {


    save: async (data) => {
        console.log(data.id);

        const temp = {
            id: filter.numbers(data.id),
            name: filter.letters(data.name),
            email: data.email,
            phone: filter.numbers(data.phone),
            zip: filter.numbers(data.zip)
        };

        const result = await model.create(temp);        
        
        return {
            fail: filter.isEmptyString(result.id),
            message: !filter.isEmptyString(result.id) ? 'New client saved ' + result.id : 'Failed',
            records: [result]
        };
    },

    find: async (id) => {        
        const _id = filter.numbers(id);

        const result = await model.findAll({            
            where: {
                id: _id
            }
        });
        
        return {
            fail: filter.isEmpty(result[0]),
            message: !filter.isEmpty(result[0]) ? 'Client found ' + result[0].name : 'Client not found',
            records: result
        }; 

    },


    edit: async (data) => {        
        const _id = filter.numbers(data.id);

        const result = await model.update({ 
            name: filter.letters(data.name),
            email: data.email,
            phone: filter.numbers(data.phone),
            zip: filter.numbers(data.zip)
         },{            
            where: {
                id: _id,
            }
        });

        return {
            fail: false,
            message: 'Client updated id ' + _id,
            records: []
        }; 

    },


    delete: async(id) => {
        const _id = filter.numbers(id);


        const result = await model.destroy({
            where: {
                id: _id
            }
        });

        return {
            fail: false,
            message: 'Client deleted, id.: ' + _id,
            records: [result]
        }; 

    }


}