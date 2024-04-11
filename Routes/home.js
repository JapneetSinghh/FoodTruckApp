const express = require('express');
const router = express.Router();
const homeController = require('../Controller/home')
router.get('/',homeController.getHomePage)


router.get('/foodTrucks/:truckId',homeController.getFoodTruck)

router.get('/writeReview/:truckId',homeController.getWriteReviewPage);
router.post('/addReview',homeController.addReview);
router.post('/search',homeController.postSearch);


router.get('/about',homeController.getAbout);

router.get('/search/:searchedText',homeController.getSearch);
router.get('/search/',homeController.getSearch);

exports.router = router;