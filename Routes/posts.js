const router = require('express').Router();
const Posts = require('../Model/post.model');

router.route('/bulletin').post( async (req, res) => {
    
    const bulletin = req.body.bulletin;
    const postData = new Posts({
        bulletin
    });
    const postSaved = await postData.save();
    if(postSaved){
        res.json({
            bulletin: postSaved.bulletin
        })
    }
});
router.route('/blogs').post( async (req, res) => {
    
    const blogs = req.body.blogs;
    const postData = new Posts({
        blogs
    });
    const postSaved = await postData.save();
    if(postSaved){
        res.json({
            blogs: postSaved.blogs
        })
    }
});
router.route('/surveys').post( async (req, res) => {
    
    const surveys = req.body.surveys;
    const postData = new Posts({
        surveys
    });
    const postSaved = await postData.save();
    if(postSaved){
        res.json({
            surveys: postSaved.surveys
        })
    }
});
module.exports = router;