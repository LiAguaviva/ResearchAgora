import express from 'express'
import offerController from './offer.controller.js';

const router = express.Router();
router.get('/createoffer', offerController.createoffer)
router.get('/alloffers', offerController.alloffers)
router.get('/oneoffer', offerController.oneoffer)
router.put('/editoffer', offerController.editoffer)
router.get('/findoffer', offerController.findoffer)
router.delete('/deleteoffer', offerController.deleteoffer)

export default router