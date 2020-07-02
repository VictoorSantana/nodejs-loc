const filter = require('../helpers/filterValidation');
const { CommonPosts, MoviePosts } = require('../helpers/reponsePosts');

const model = require('../models/moviesModel');

const { Movie } = require('../helpers/enumStatusMovie');

module.exports = {
    /*
    categories
    release
    director
    price
    title
    */
    save: async (data) => {        
        
        const temp = { 
            title: filter.letters(data.title),
            price: filter.numbers(data.price),
            director: filter.letters(data.director),
            release: data.release,
            categories: filter.letters(data.categories)
        };

        const result = await model.create(temp);        
        
        return {
            fail: filter.isEmptyString(result.id),
            message: !filter.isEmptyString(result.id) ? [CommonPosts.SAVED] : [CommonPosts.FAIL_TO_SAVE],
            records: [result]
        };
    },


    saveLot: async (data) => {        
        var result = [];        

        for(var i = 0; i < data.length; i++) {  

            const singleData = { 
                title: filter.letters(data[i].title),
                price: filter.numbers(data[i].price),
                director: filter.letters(data[i].director),
                release: data[i].release,
                categories: filter.letters(data[i].categories),
                status: Movie.AVAILABLE
            };

            const tempResult = await model.create(singleData);     
            result.push(tempResult);            
        } 
           
        
        return {
            fail: !filter.hasRecords(result),
            message: filter.hasRecords(result) ? [CommonPosts.SAVED] : [CommonPosts.FAIL_TO_SAVE],
            records: result
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
            message: !filter.isEmpty(result[0]) ? [CommonPosts.FOUND] : [CommonPosts.NOT_FOUND],
            records: result
        }; 

    },

    all: async () => {                
        const result = await model.findAll();
        
        return {
            fail: filter.isEmpty(result[0]),
            message: filter.hasRecords(result) ? [CommonPosts.FOUND] : [CommonPosts.NOT_FOUND],
            records: result
        }; 

    },

    findCategory: async (category) => {        
        const _category = filter.letters(category);

        const result = await model.findAll(
            {            
                where: {
                    categories: _category
                }
            }
        );
        
        return {
            fail: filter.hasRecords(result),
            message: filter.hasRecords(result) ? [CommonPosts.FOUND] : [CommonPosts.NOT_FOUND],
            records: result
        }; 

    },


    edit: async (data) => {        
        const _id = filter.numbers(data.id);        

        const result_b = await model.findAll({            
            where: {
                id: _id
            }
        });

        if(!filter.hasRecords(result_b)) {
            return {
                fail: true,
                message: [MoviePosts.NOT_FOUND_TO_UPDATE],
                records: []
            }; 
        }

        const result = await model.update({ 
            title: filter.letters(data.title),
            price: filter.numbers(data.price),
            director: filter.letters(data.director),
            release: data.release,
            categories: filter.letters(data.categories)
         },{            
            where: {
                id: _id,
            }
        });

        return {
            fail: false,
            message: [CommonPosts.UPDATED],
            records: []
        }; 

    },


    setStatus: async (id, status) => {        
        const _id = filter.numbers(id);
        const _status = filter.numbers(status);

        const result_b = await model.findAll({            
            where: {
                id: _id
            }
        });

        if(!filter.hasRecords(result_b)) {
            return {
                fail: true,
                message: [MoviePosts.NOT_FOUND_TO_UPDATE],
                records: []
            }; 
        }
        

        const result = await model.update({ 
            status: _status
         },{            
            where: {
                id: _id,
            }
        });

        return {
            fail: false,
            message: MoviePosts.NEW_STATUS,
            records: []
        }; 

    },


    delete: async(id) => {
        const _id = filter.numbers(id);

        const result_b = await model.findAll({            
            where: {
                id: _id
            }
        });

        if(!filter.hasRecords(result_b)) {
            return {
                fail: true,
                message: [MoviePosts.NOT_FOUND_TO_UPDATE],
                records: []
            }; 
        }
        
        const result = await model.update({ 
            status: Movie.OCCULT
         },{            
            where: {
                id: _id,
            }
        });

        return {
            fail: false,
            message: MoviePosts.OCCULT,
            records: []
        };  

    }


}