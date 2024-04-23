import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    authorName: {
        type: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;