import express from "express";

// const express = require('express'); //CommonJS
const router = express.Router();
// const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('./controller'); //CommonJS
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from './controller.js';
import { isAuthenticated } from '../authentication/authMiddleware.js';


//A series of Routes
// Create Posts
// router.post('/', isAuthenticated, createPost);
router.post('/', createPost);

// Get Post
router.get('/', getAllPosts);

// Get Post by ID
router.get('/:id', getPostById);

// update post
router.put('/:id', isAuthenticated, updatePost);
// router.put('/:id', updatePost);

// Delete post
router.delete('/:id', isAuthenticated, deletePost);
// router.delete('/:id', deletePost);

// module.exports = router;
export default router;