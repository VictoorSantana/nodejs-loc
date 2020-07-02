var express = require('express');
var router = express.Router();

const provider = require('../provider/clientProvider');
const { validateToken } = require('../filters/filterAuth');


router.post('/new', validateToken(),async function(req, res) {
    
    const response = await provider.save(req.body);
    res.json(response);
    
});



router.get('/find/:id', validateToken(), async function(req, res) {

    const response = await provider.find(req.params.id);
    res.json(response);

});



router.put('/edit', validateToken(), async function(req, res) {

    const response = await provider.edit(req.body);
    res.json(response);

});


router.delete('/delete/:id', validateToken(), async function(req, res) {
    
    const response = await provider.delete(req.params.id);
    res.json(response);
    
});



router.get('/test', async function(req, res) {
    res.json(
        {
            fail: false,
            message: 'Hello World from NodeJS',
            records: []
        }
    );
});

module.exports = router;