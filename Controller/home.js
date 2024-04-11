const FoodTruck = require('../Model/foodTruck');
const { validationResult } = require('express-validator');

// exports.getHomePage = (req, res, next) => {
//     console.log('Welcome to home page');
//     FoodTruck.find()
//         .then(truck => {




//             return res.render('index', {
//                 pageTitle: "Taste On Wheels",
//                 truck: truck,
//                 topRatedTrucks:[]
//             })
//         })
// }

exports.getHomePage = (req, res, next) => {
    console.log('Welcome to home page');
    FoodTruck.find()
        .then(trucks => {

            const bogoTrucks = trucks.filter(truck => truck.bogoOn && truck.bogoOn.length > 0);


            const sortedByRating = trucks.slice().sort((a, b) => b.rating - a.rating);


            const topRatedTrucks = sortedByRating.slice(0, Math.min(sortedByRating.length, 10));


            const sortedByDiscount = trucks.slice().sort((a, b) => b.discountToday - a.discountToday);


            const topDiscountedTrucks = sortedByDiscount.slice(0, Math.min(sortedByDiscount.length, 10));

            return res.render('index', {
                pageTitle: "Taste On Wheels",
                truck: trucks,
                bogoTrucks: bogoTrucks,
                topRatedTrucks: topRatedTrucks,
                topDiscountedTrucks: topDiscountedTrucks
            });
        })
        .catch(err => {
            console.error('Error fetching food trucks:', err);

            next(err);
        });
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
        .catch(err => {
            console.log('Truck Id Wrong, Truck not found');
            return res.redirect('/');
        })
}

exports.getAbout = (req, res, next) => {
    return res.render('about', {
        pageTitle: "About",
    })
}


exports.getWriteReviewPage = (req, res, next) => {
    const truckId = req.params.truckId;
    if (!req.session.isLoggedIn) {
        req.flash('error', 'Login to Review Food Truck');
        req.flash('className', 'errorFlash');
        return res.redirect('/login');
    }

    FoodTruck.findById(truckId)
        .then(truck => {
            return res.render('review', {
                pageTitle: `${truck.name} Review`,
                truck: truck
            })
        })
        .catch(err => {
            console.log('Truck Id Wrong, Truck not found');
            return res.redirect('/');
        })

}

exports.addReview = (req, res, next) => {
    const truckId = req.body.truckId;
    const rating = req.body.ratingValue;

    let testimonials =
    {
        review: req.body.review,
        name: req.body.name,
        rating: req.body.ratingGiven,
        userId: req.session.user._id
    }


    FoodTruck.findById(truckId)
        .then(truck => {
            console.log(truck.testimonials)
            truck.testimonials.push(testimonials);
            truck.save()
                .then(savedTruck => {
                    let rating = 0;
                    let lastIndex = 0;
                    savedTruck.testimonials.forEach((testimonial, index) => {
                        rating = rating + parseInt(testimonial.rating);
                        lastIndex = index + 1;
                    })
                    console.log(rating);
                    console.log(lastIndex);

                    let newRating = (rating / lastIndex).toFixed(2);
                    console.log('Rating', newRating);

                    savedTruck.rating = newRating;
                    savedTruck.save().then(result => {
                        console.log(result);
                        return res.redirect(`/foodTrucks/${truckId}`)
                    });
                })
        })
        .catch(err => {
            console.log('Truck Id Wrong, Truck not found');
            return res.redirect('/');
        })
}

exports.postSearch = (req, res, next) => {
    const search = req.body.search;
    if (search === '') {
        return res.render('search', {
            pageTitle: `Search ${search}`,
            url: '/search',
            truck: [],
            message: "Search field can't be empty, search for food trucks, dishes, cusines",
            search: ''
        })
    }

    return res.redirect(`/search/${search}`);
}

exports.getSearch = (req, res, next) => {
    const search = req.params.searchedText;
    FoodTruck.find(
        {
            $or: [
                {
                    name: {
                        $regex: '\\b' + search + '\\b', $options: "i",
                    }
                },
                {
                    address: {
                        $regex: '\\b' + search + '\\b', $options: "i",
                    }
                },
                {
                    description: {
                        $regex: '\\b' + search + '\\b', $options: "i",
                    }
                },
                {
                    cusinesOffered: {
                        $regex: '\\b' + search + '\\b', $options: "i",
                    }
                },
                {
                    "threeSpecialDishes.dish": { $regex: '\\b' + search + '\\b', $options: "i" }
                }
            ],

        }).then(truck => {
            console.log(truck);
            return res.render('search', {
                pageTitle: `Search ${search}`,
                url: '/search',
                truck: truck,
                message: `Search Results for ${search} `,
                search: search
            });
        }).catch(err => {
            return res.render('search', {
                pageTitle: `Search ${search}`,
                url: '/search',
                truck: [],
                message: `Sorry, No results found for ${search}`,
                search: search

            })
        })
}
