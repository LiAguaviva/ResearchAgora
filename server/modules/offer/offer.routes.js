import express from 'express'
import offerController from './offer.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router();
router.post('/createoffer/:project_id', tokenVerify, offerController.createOffer)
router.get('/alloffers', offerController.allOffers)
router.put('/deleteoffer/:offer_id', tokenVerify, offerController.deleteOffer)
router.post('/findofferbyskill', offerController.findOfferBySkill)
router.get('/offersbyproject/:project_id', offerController.offersByProject)
router.post('/joinrequest', tokenVerify, offerController.joinRequest)
router.get('/oneoffer/:offer_id', offerController.oneOffer)
router.put('/updateoffer/:offer_id', tokenVerify, offerController.updateOffer)

export default router