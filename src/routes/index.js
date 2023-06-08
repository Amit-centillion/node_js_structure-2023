import express from 'express';

const router = express.Router();

router.use('/test',require('./test-api.route'))

module.exports = router;
