const { ensureAuthenticated } = require('../Middlewares/Auth');

const router = require('express').Router();


router.get('/', ensureAuthenticated, (req, res) => {
    console.log('--------------login user -----------',req.user); 
    res.status(200).json( 
        [
            {
                name: "TV",
                price: "25000"
            },
            {
                name: "Mobile",
                price: "20000"
            }
        ]
    );
})


module.exports = router; 
