var express = require('express');
var router = express.Router();

const provider = require('../provider/movieProvider');
const { validateToken } = require('../filters/filterAuth');


router.post('/new', validateToken(),async function(req, res) {
    
    const response = await provider.save(req.body);
    res.json(response);
    
});

router.post('/newlot', validateToken(),async function(req, res) {
    
    const response = await provider.saveLot(req.body);
    res.json(response);
    
});

router.get('/find/:id', validateToken(), async function(req, res) {

    const response = await provider.find(req.params.id);
    res.json(response);

});


router.get('/all', validateToken(), async function(req, res) {

    const response = await provider.all();
    res.json(response);

});


router.get('/findCategory/:category', validateToken(), async function(req, res) {

    const response = await provider.findCategory(req.params.category);
    res.json(response);

});


router.put('/edit', validateToken(), async function(req, res) {

    const response = await provider.edit(req.body);
    res.json(response);

});

router.put('/status/:id/:status', validateToken(), async function(req, res) {

    const response = await provider.setStatus(req.params.id, req.params.status);
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