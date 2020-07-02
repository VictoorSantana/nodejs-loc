var express = require('express');
var router = express.Router();

const provider = require('../provider/rentProvider');
const { validateToken } = require('../filters/filterAuth');


router.get('/all', validateToken(), async function(req, res) {

    const response = await provider.all();
    res.json(response);

});

router.get('/findClient/:id', validateToken(), async function(req, res) {

    const response = await provider.findClient(req.params.id);
    res.json(response);

});

router.get('/findMovie/:id', validateToken(), async function(req, res) {

    const response = await provider.findMovie(req.params.id);
    res.json(response);

});


router.post('/new', validateToken(), async function(req, res) {
    
    const response = await provider.save(req.body);
    res.json(response);
    
});


router.put('/returned/:idmovie/:idclient', validateToken(), async function(req, res) {
    
    const response = await provider.returned(req.params.idmovie, req.params.idclient);
    res.json(response);
    
});

router.put('/occult/:id', validateToken(), async function(req, res) {
    
    const response = await provider.occult(req.params.id);
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