const express = require('express');
const router = express.Router();
const homeController = require('../Controller/home')
router.get('/',homeController.getHomePage)


router.get('/foodTrucks/:truckId',homeController.getFoodTruck)

exports.router = router;