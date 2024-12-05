// import express from "express";

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('./controller');
// const authenticateToken = require('../authentication/controller').authenticateToken;

// 创建新的帖子
// router.post('/', authenticateToken, createPost);
router.post('/', createPost);

// 获取所有帖子
router.get('/', getAllPosts);

// 根据ID获取帖子
router.get('/:id', getPostById);

// 更新帖子
// router.put('/:id', authenticateToken, updatePost);
router.put('/:id', updatePost);

// 删除帖子
// router.delete('/:id', authenticateToken, deletePost);
router.delete('/:id', deletePost);

module.exports = router;