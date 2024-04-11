const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// isAuth is a middelwear which verifies if the user trying to access dashboard is autheitnicated or not
const isAuth = require('../Middlewear/isAuth');

const dashboardController = require('../Controller/dashboard')

// Get Dashboard Page
router.get('/dashboard', isAuth, dashboardController.getDashboard)

// Get Add Food Truck Page
router.get('/addFoodTruck', isAuth, dashboardController.getAddFoodTruck)

// Get My Trucks
router.get('/myTrucks', isAuth, dashboardController.getMyTrucks)

// Get all trucks
router.get('/getAllTrucks', isAuth, dashboardController.getAllTrucks)

// Get My Trucks
router.post('/delete', isAuth, dashboardController.deleteTruck)

// Edit Truck
router.get('/editFoodTruck/:truckId', isAuth, dashboardController.getEditMyTruck)
router.post('/postEditFoodTruck',
    [
        body('name').custom((value => {
            if (value === '') {
                throw new Error('Please enter the name of your food truck')
            }
            return true;
        })),
        body('imageUrl').custom((value => {
            if (value === '') {
                throw new Error('Please enter the Image URL of your food truck')
            }
            return true;
        })),
        body('address').custom((value => {
            if (value === '') {
                throw new Error('Please enter the address of your food truck')
            }
            return true;
        })),
        body('contactNumbers').custom((value => {
            if (value === '') {
                throw new Error('Please enter contact for two')
            }
            return true;
        })),
        body('email').isEmail().withMessage('Please Enter A Valid Email'),
        body('priceForTwo').custom((value => {
            if (value === '') {
                throw new Error('Please enter price for two')
            }

            return true;
        })),
        body('specialDishOne').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish one field')
            }
            return true;
        })),
        body('specialDishTwo').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish two field')
            }
            return true;
        })),
        body('specialDishThree').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish three field')
            }
            return true;
        })),
        body('cusinesOffered').custom((value => {
            if (value === '') {
                throw new Error('Please enter the cusines offered')
            }
            return true;
        })),
        body('famousFor').custom((value => {
            if (value === '') {
                throw new Error('Please fill out the famous for field')
            }
            return true;
        })),
        body('description').custom((value => {
            if (value === '') {
                throw new Error('Please enter description about your food truck')
            }
            return true;
        }))
    ], isAuth, dashboardController.postEditMyTruck)
// Post Food Truck
router.post('/addFoodTruck',
    [
        body('name').custom((value => {
            if (value === '') {
                throw new Error('Please enter the name of your food truck')
            }
            return true;
        })),
        body('email').isEmail().withMessage('Please Enter A Valid Email'),
        body('address').custom((value => {
            if (value === '') {
                throw new Error('Please enter the address of your food truck')
            }
            return true;
        })),
        body('imageUrl').custom((value => {
            if (value === '') {
                throw new Error('Please enter the Image URL of your food truck')
            }
            return true;
        })),
        body('priceForTwo').custom((value => {
            if (value === '') {
                throw new Error('Please enter price for two')
            }

            return true;
        })),
        body('specialDishOne').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish one field')
            }
            return true;
        })),
        body('specialDishTwo').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish two field')
            }
            return true;
        })),
        body('specialDishThree').custom((value => {
            if (value === '') {
                throw new Error('Please fill the special dish three field')
            }
            return true;
        })),
        body('cusinesOffered').custom((value => {
            if (value === '') {
                throw new Error('Please enter the cusines offered')
            }
            return true;
        })),
        body('famousFor').custom((value => {
            if (value === '') {
                throw new Error('Please fill out the famous for field')
            }
            return true;
        })),
        body('description').custom((value => {
            if (value === '') {
                throw new Error('Please enter description about your food truck')
            }
            return true;
        }))
    ], isAuth, dashboardController.postAddFoodTruck)

exports.router = router;