export const isAuthenticated = (req, res, next) => {
    console.log('Authenticated:', req.isAuthenticated && req.isAuthenticated());
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access' });
};
