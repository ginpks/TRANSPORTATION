import express from "express";

const router = express.Router();
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from './controller.js';
import { isAuthenticated } from '../authentication/authMiddleware.js';


//A series of Routes
// Create Posts
router.post('/', isAuthenticated, createPost);

// Get Post
router.get('/', getAllPosts);

// Get Post by ID
router.get('/:id', getPostById);

// update post
router.put('/:id', isAuthenticated, updatePost);

// Delete post
router.delete('/:id', isAuthenticated, deletePost);

export default router;