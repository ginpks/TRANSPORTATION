import { Feedback } from './feedback.js';

// Submit feedback

export const submitFeedback = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;

        // Validate the fields
        if (!userId || !rating || !comment) {
            console.error('Missing required fields:', { userId, rating, comment });
            return res.status(400).json({ error: 'All fields (userId, rating, comment) are required' });
        }

        // Create feedback in the database
        const feedback = await Feedback.create({ userId, rating, comment });
        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error submitting feedback:', error.message);
        res.status(500).json({ error: 'Failed to submit feedback', details: error.message });
    }
};
// Get all feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.findAll();
        res.status(200).json(feedbackList);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }
};
