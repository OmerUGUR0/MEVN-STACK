
import mongoose from 'mongoose'


const postSchheme = mongoose.Schema({
    title: {
        type: String,

    },
    content: {
        type: String,

    },
    creator: {
        type: String,
    },
})


const Post = mongoose.model('post',postSchheme)

export default Post
