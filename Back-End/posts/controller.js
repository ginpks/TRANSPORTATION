// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import Post from "../Back-End/posts/post.js";

const { Post } = require('./post');

//Create post
exports.createPost = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const postData = req.body;

        // postData.userId = req.user.userId;

        const post = await Post.create(postData);
        console.log('New Post Created:', post);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: error.message });
    }
};

//get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.update(req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};