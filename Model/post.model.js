const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postShema = new Schema({
    
    bulletin: {
        type: String
    },
    blogs: {
        type: String
    },
    surveys: {
        type: String
    }
});
const Post = mongoose.model('Post', postShema)
module.exports = Post;