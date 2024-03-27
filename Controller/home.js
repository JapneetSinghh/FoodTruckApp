const FoodTruck = require('../Model/foodTruck');

exports.getHomePage = (req, res, next) => {
    console.log('Welcome to home page');
    FoodTruck.find()
        .then(truck => {
            return res.render('index', {
                pageTitle: "Taste On Wheels",
                truck: truck
            })
        })
}

exports.getFoodTruck = (req, res, next) => {
    const truckId = req.params.truckId;
    FoodTruck.findById(truckId)
        .then(truck => {
            return res.render('foodtruck', {
                pageTitle: "Taste On Wheels",
                truck: truck
            })
        })
        .catch(err=>{
            console.log('Truck Id Wrong, Truck not found');

        })
}