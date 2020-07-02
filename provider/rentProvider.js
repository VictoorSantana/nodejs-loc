const filter = require('../helpers/filterValidation');

const { Movie } = require('../helpers/enumStatusMovie');
const { Rent } = require('../helpers/enumStatusRent');

const model = require('../models/rentModel');
const modelMovie = require('../models/moviesModel');
const modelClient = require('../models/clientModel');

module.exports = {


    save: async (data) => {               
        const _id_movie = filter.numbers(data.id_movie);
        const _id_client = filter.numbers(data.id_client);

        const result_client = await modelClient.findAll({            
            where: {
                id: _id_client
            }
        });

        if(!filter.hasRecords(result_client)) {
            return {
                fail: true,
                message: `Client id ${_id_client} not found.`,
                records: []
            };
        }

        const result_movie = await modelMovie.findAll({            
            where: {
                id: _id_movie,
                status: Movie.AVAILABLE
            }
        });

        if(!filter.hasRecords(result_movie)) {
            return {
                fail: true,
                message: 'Movie not found, or is not available to rent.',
                records: []
            };
        }


        const temp = {
            id_client: _id_client,
            id_movie: _id_movie,
            date: data.date,
            status: Rent.RENTED
        };

        const result = await model.create(temp);     
        
        
        const result_b = await modelMovie.update({ //movie table
            status: Movie.RENTED
        },{
            where: {
                id: _id_movie
            }
        });
        
        return {
            fail: filter.isEmptyString(result.id),
            message: '',
            records: [result, result_b]
        };
    },


    returned: async (id_movie, id_client) => {        
        const _id_movie = filter.numbers(id_movie);
        const _id_client = filter.numbers(id_client);

        const result_client = await modelClient.findAll({            
            where: {
                id: _id_client
            }
        });

        if(!filter.hasRecords(result_client)) {
            return {
                fail: true,
                message: `Client id ${_id_client} not found.`,
                records: []
            };
        }

        const result_movie = await modelMovie.findAll({            
            where: {
                id: _id_movie,
                status: Movie.RENTED
            }
        });

        if(!filter.hasRecords(result_movie)) {
            return {
                fail: true,
                message: 'Movie not found, or is not rented.',
                records: []
            };
        }
        

        const result = await model.update({ //rent table
            status: Rent.RETURNED
         },{            
            where: {
                id_client: _id_client,
                id_movie: _id_movie,
            }
        });

        const result_b = await modelMovie.update({ //movie table
            status: Movie.AVAILABLE
        },{
            where: {
                id: _id_movie
            }
        });

        return {
            fail: false,
            message: 'The movie ' + _id,
            records: [result, result_b]
        }; 

    },

    all: async () => {                
        const result = await model.findAll();
        
        return {
            fail: filter.isEmpty(result[0]),
            message: 'All rented movies',
            records: result
        }; 

    },


    findClient: async (id) => {        
        const _id = filter.numbers(id);

        const result = await model.findAll(
            {            
                where: {
                    id_client: _id
                }
            }
        );
        
        return {
            fail: filter.isEmpty(result[0]),
            message: !filter.isEmpty(result[0]) ? 'client found' : 'not found',
            records: result
        }; 

    },


    findMovie: async (id) => {        
        const _id = filter.numbers(id);

        const result = await model.findAll(
            {            
                where: {
                    id_movie: _id,
                    status: [Rent.RENTED, Rent.RETURNED]
                }
            }
        );
        
        return {
            fail: filter.isEmpty(result[0]),
            message: !filter.isEmpty(result[0]) ? 'movie found' : 'not found',
            records: result
        }; 

    },


    occult: async (id) => {        
        const _id = filter.numbers(id);        

        const result = await model.update({ 
            status: Rent.OCCULT
         },{            
            where: {
                id: _id,
            }
        });

        return {
            fail: false,
            message: 'The rent is set to be occulted, id.: ' + _id,
            records: []
        }; 

    },




}