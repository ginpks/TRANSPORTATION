// import express from "express";

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('./controller');
// const authenticateToken = require('../authentication/controller').authenticateToken;

// Create Post
// router.post('/', authenticateToken, createPost);
router.post('/', createPost);

// Get Post
router.get('/', getAllPosts);

// Get Post by ID
router.get('/:id', getPostById);

// update post
// router.put('/:id', authenticateToken, updatePost);
router.put('/:id', updatePost);

// Delete post
// router.delete('/:id', authenticateToken, deletePost);
router.delete('/:id', deletePost);

module.exports = router;