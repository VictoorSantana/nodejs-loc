var express = require('express');
var router = express.Router();

const provider = require('../provider/authProvider');
const { validateTokenGetUser } = require('../filters/filterAuth');



router.post('/login', async function(req, res) {
    
    const response = await provider.tryLogin(req.body);
    res.json(response);
    
});

router.get('/whoiam', validateTokenGetUser(), async function(req, res) {

    const response = await provider.findUserId(req.decoded);
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