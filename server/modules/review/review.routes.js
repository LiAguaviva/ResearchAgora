import express from 'express'
import reviewController from './review.controller.js';

const router = express.Router();
router.post('/createreview', reviewController.addReview)

export default router