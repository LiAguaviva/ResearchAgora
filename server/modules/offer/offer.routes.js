import express from 'express'
import offerController from './offer.controller.js';

const router = express.Router();
router.post('/createoffer/:project_id', offerController.createOffer)
router.get('/alloffers', offerController.allOffers)
router.put('/deleteoffer/:offer_id', offerController.deleteOffer)
router.post('/findofferbyskill', offerController.findOfferBySkill)
router.get('/offersbyproject/:project_id', offerController.offersByProject)
router.post('/joinrequest', offerController.joinRequest)
router.post('/editoffer', offerController.editoffer)



// router.put('/editoffer', offerContro ller.editoffer)  ///for future use
export default router