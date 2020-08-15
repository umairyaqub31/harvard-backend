const router = require('express').Router();
const Events = require('../Model/events.model');

//test

router.route('/past').post( async (req, res) => {
    
    const past = req.body.past;
    const eventData = new Events({
        past
    });
    const eventSaved = await eventData.save();
    if(eventSaved){
        res.json({
            past: eventSaved.past
        })
    }
});
router.route('/current').post( async (req, res) => {
    
    const current = req.body.current;
    const eventData = new Events({
        current
    });
    const eventSaved = await eventData.save();
    if(eventSaved){
        res.json({
            current: eventSaved.current
        })
    }
});
router.route('/future').post( async (req, res) => {
    
    const future = req.body.future;
    const eventData = new Events({
        future
    });
    const eventSaved = await eventData.save();
    if(eventSaved){
        res.json({
            future: eventSaved.future,
            message:"event Saved"
        })
    }
});

module.exports = router;
