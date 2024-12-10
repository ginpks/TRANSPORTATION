import express from 'express';
import { submitFeedback, getAllFeedback } from './controller.js';

const router = express.Router();

// Submit feedback
router.post('/feedback', submitFeedback);

// Get all feedback
router.get('/feedback', getAllFeedback);

export default router;

export const feedbackRoutes = router;