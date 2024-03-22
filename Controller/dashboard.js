const FoodTruck = require('../Model/foodTruck')
const { validationResult } = require('express-validator');

exports.getDashboard = (req, res, next) => {
    console.log('req.session.isLoggedIn:', req.session.isLoggedIn)
    res.render('dashboard/dashboard', {
        pageTitle: 'Dashboard',
        url: '/dashboard'
    })
}


exports.getAddFoodTruck = (req, res, next) => {

    let className = req.flash('className');
    res.render('dashboard/addFoodTruck', {
        pageTitle: 'Dashboard',
        url: '/addFoodTruck',
        truckId: '',
        message: '',
        className: '',
        name: '',
        address: '',
        priceForTwo: '',
        mondayStatus: 'true',
        tuesdayStatus: '',
        wednesdayStatus: '',
        thursdayStatus: '',
        fridayStatus: '',
        saturdayStatus: '',
        sundayStatus: '',
        openingTimeMonday: '11:00',
        closingTimeMonday: '23:00',
        openingTimeTuesday: '11:00',
        closingTimeTuesday: '23:00',
        openingTimeWednesday: '11:00',
        closingTimeWednesday: '23:00',
        openingTimeThursday: '11:00',
        closingTimeThursday: '23:00',
        openingTimeFriday: '11:00',
        closingTimeFriday: '23:00',
        openingTimeSaturday: '11:00',
        closingTimeSaturday: '23:00',
        openingTimeSunday: '11:00',
        closingTimeSunday: '23:00',
        cusinesOffered: '',
        specialDishOne: '',
        specialDishTwo: '',
        specialDishThree: '',
        famousFor: '',
        description: '',
        year: '',
        discountToday: '',
        customDiscount1: '',
        customDiscount2: '',
        customDiscount3: '',
        email: '',
        contactNumbers: '',
        bogoOn: ['Monday', 'Thursday'],
        website: ''
    })
}

exports.postAddFoodTruck = (req, res, next) => {
    const errors = validationResult(req);


    console.log(req.body);
    const name = req.body.name;
    const address = req.body.address;
    const priceForTwo = req.body.priceForTwo;

    const mondayStatus = req.body.MondayStatus;
    const tuesdayStatus = req.body.TuesdayStatus;
    const wednesdayStatus = req.body.WednesdayStatus;
    const thursdayStatus = req.body.ThursdayStatus;
    const fridayStatus = req.body.FridayStatus;
    const saturdayStatus = req.body.SaturdayStatus;
    const sundayStatus = req.body.SundayStatus;

    const openingTimeMonday = req.body.openingTimeMonday;
    const closingTimeMonday = req.body.closingTimeMonday;

    const openingTimeTuesday = req.body.openingTimeTuesday;
    const closingTimeTuesday = req.body.closingTimeTuesday;

    const openingTimeWednesday = req.body.openingTimeWednesday;
    const closingTimeWednesday = req.body.closingTimeWednesday;

    const openingTimeThursday = req.body.openingTimeThursday;
    const closingTimeThursday = req.body.closingTimeThursday;

    const openingTimeFriday = req.body.openingTimeFriday;
    const closingTimeFriday = req.body.closingTimeFriday;

    const openingTimeSaturday = req.body.openingTimeSaturday;
    const closingTimeSaturday = req.body.closingTimeSaturday;

    const openingTimeSunday = req.body.openingTimeSunday;
    const closingTimeSunday = req.body.closingTimeSunday;

    const cusinesOffered = req.body.cusinesOffered;

    const specialDishOne = req.body.specialDishOne;
    const specialDishTwo = req.body.specialDishTwo;
    const specialDishThree = req.body.specialDishThree;

    const famousFor = req.body.famousFor;
    const description = req.body.description;
    const year = req.body.year;
    const discountToday = req.body.discountToday;

    const customDiscount1 = req.body.customDiscount1;
    const customDiscount2 = req.body.customDiscount2;
    const customDiscount3 = req.body.customDiscount3;

    const email = req.body.email;
    const contactNumbers = req.body.contactNumbers;

    const bogoOn = req.body.bogoOn;
    const website = req.body.website;


    if (!errors.isEmpty()) {
        let className = 'errorFlash'
        return res.render('dashboard/addFoodTruck', {
            message: errors.array()[0].msg,
            className: className,
            pageTitle: 'Dashboard',
            url: '/addFoodTruck',
            truckId: '',
            name: name,
            address: address,
            priceForTwo: priceForTwo,
            mondayStatus: mondayStatus,
            tuesdayStatus: tuesdayStatus,
            wednesdayStatus: wednesdayStatus,
            thursdayStatus: thursdayStatus,
            fridayStatus: fridayStatus,
            saturdayStatus: saturdayStatus,
            sundayStatus: saturdayStatus,
            openingTimeMonday: openingTimeMonday,
            closingTimeMonday: closingTimeMonday,
            openingTimeTuesday: openingTimeTuesday,
            closingTimeTuesday: closingTimeTuesday,
            openingTimeWednesday: openingTimeWednesday,
            closingTimeWednesday: closingTimeWednesday,
            openingTimeThursday: openingTimeThursday,
            closingTimeThursday: closingTimeThursday,
            openingTimeFriday: openingTimeFriday,
            closingTimeFriday: closingTimeFriday,
            openingTimeSaturday: openingTimeSaturday,
            closingTimeSaturday: closingTimeSaturday,
            openingTimeSunday: openingTimeSunday,
            closingTimeSunday: closingTimeSunday,
            cusinesOffered: cusinesOffered,
            specialDishOne: specialDishOne,
            specialDishTwo: specialDishTwo,
            specialDishThree: specialDishThree,
            famousFor: famousFor,
            description: description,
            year: year,
            discountToday: discountToday,
            customDiscount1: customDiscount1,
            customDiscount2: customDiscount2,
            customDiscount3: customDiscount3,
            email: email,
            contactNumbers: contactNumbers,
            bogoOn: bogoOn,
            website: website
        })
    } else {
        const foodTruck = new FoodTruck({
            name: name,
            address: address,
            priceForTwo: priceForTwo,
            openingHours: [{
                day: 'Monday',
                open: mondayStatus,
                openingTime: openingTimeMonday,
                closingTime: closingTimeMonday
            },
            {
                day: 'Tuesday',
                open: tuesdayStatus,
                openingTime: openingTimeTuesday,
                closingTime: closingTimeTuesday
            },
            {
                day: 'Wednesday',
                open: wednesdayStatus,
                openingTime: openingTimeWednesday,
                closingTime: closingTimeWednesday
            },
            {
                day: 'Thursday',
                open: thursdayStatus,
                openingTime: openingTimeThursday,
                closingTime: closingTimeThursday
            },
            {
                day: 'Friday',
                open: fridayStatus,
                openingTime: openingTimeFriday,
                closingTime: closingTimeFriday
            },
            {
                day: 'Saturday',
                open: saturdayStatus,
                openingTime: openingTimeSaturday,
                closingTime: closingTimeSaturday
            },
            {
                day: 'Sunday',
                open: sundayStatus,
                openingTime: openingTimeSunday,
                closingTime: closingTimeSunday
            }],
            cusinesOffered: cusinesOffered,
            threeSpecialDishes: [
                {
                    dish: specialDishOne
                },
                {
                    dish: specialDishTwo
                },
                {
                    dish: specialDishThree
                }
            ],
            famousFor: famousFor,
            description: description,
            servingSince: year,
            discountToday: discountToday,
            bogoOn: bogoOn,
            customDiscount1: customDiscount1,
            customDiscount2: customDiscount2,
            customDiscount3: customDiscount3,
            email: email,
            contactNumbers: contactNumbers,
            images: [
                {
                    mainImage: '',
                    menu: [],
                    gallery: [],
                    specialThreeDishes: []
                }
            ],
            website:website
        })


        foodTruck.save()
            .then(result => {
                console.log(result);
                let truckId = result._id.toString()
                console.log(truckId)
                return res.redirect(`/myTrucks`)
            })
            .catch(result => {
                console.log(result);
                req.flash('error', 'Sorry, some database error occured');
                req.flash('className', 'errorFlash');
                return res.redirect(`/addFoodTruck`)

            })
    }
}


exports.postTruckImages = (req, res, next) => {

}

exports.getMyTrucks = (req, res, next) => {
    FoodTruck.find()
        .then(truck => {
            console.log(truck);
            return res.render('dashboard/myTrucks', {
                pageTitle: 'myTruck',
                url: '/myTrucks',
                truck: truck
            })
        })
}
exports.getEditMyTruck = (req, res, next) => {
    const truckId = req.params.truckId;
    console.log(truckId)

    FoodTruck.findById(truckId)
        .then(truck => {
            console.log('Truck to be edited', truck);
            res.render('dashboard/addFoodTruck', {
                pageTitle: 'Edit Food Truck',
                url: '/editFoodTruck',
                truckId: truck._id,
                message: '',
                className: '',
                name: truck.name,
                address: truck.address,
                priceForTwo: truck.priceForTwo,
                mondayStatus: truck.openingHours[0].open,
                tuesdayStatus: truck.openingHours[1].open,
                wednesdayStatus: truck.openingHours[2].open,
                thursdayStatus: truck.openingHours[3].open,
                fridayStatus: truck.openingHours[4].open,
                saturdayStatus: truck.openingHours[5].open,
                sundayStatus: truck.openingHours[6].open,
                openingTimeMonday: truck.openingHours[0].openingTime,
                closingTimeMonday: truck.openingHours[0].openingTime,
                openingTimeTuesday: truck.openingHours[1].openingTime,
                closingTimeTuesday: truck.openingHours[1].openingTime,
                openingTimeWednesday: truck.openingHours[2].openingTime,
                closingTimeWednesday: truck.openingHours[2].openingTime,
                openingTimeThursday: truck.openingHours[3].openingTime,
                closingTimeThursday: truck.openingHours[3].openingTime,
                openingTimeFriday: truck.openingHours[4].openingTime,
                closingTimeFriday: truck.openingHours[4].openingTime,
                openingTimeSaturday: truck.openingHours[5].openingTime,
                closingTimeSaturday: truck.openingHours[5].openingTime,
                openingTimeSunday: truck.openingHours[6].openingTime,
                closingTimeSunday: truck.openingHours[6].openingTime,
                cusinesOffered: truck.cusinesOffered,
                specialDishOne: truck.threeSpecialDishes[0].dish,
                specialDishTwo: truck.threeSpecialDishes[1].dish,
                specialDishThree: truck.threeSpecialDishes[2].dish,
                famousFor: truck.famousFor,
                description: truck.description,
                year: truck.servingSince,
                discountToday: truck.discountToday,
                customDiscount1: truck.customDiscount1,
                customDiscount2: truck.customDiscount2,
                customDiscount3: truck.customDiscount3,
                email: truck.email,
                contactNumbers: truck.contactNumbers,
                bogoOn: truck.bogoOn,
                website: truck.website
            })
        })
        .catch(err => {
            console.log(err);
            console.log('Truck not found');
            return res.redirect('/myTrucks')
        })

}
exports.postEditMyTruck = (req, res, next) => {
    const truckId = req.body.truckId;
    const errors = validationResult(req);
    1
    if (!errors.isEmpty()) {
        let className = 'errorFlash'
        return res.render('dashboard/addFoodTruck', {
            message: errors.array()[0].msg,
            className: className,
            pageTitle: 'Edit Food Truck',
            url: '/editFoodTruck',
            truckId: truckId,
            name: req.body.name,
            address: req.body.address,
            priceForTwo: req.body.priceForTwo,
            mondayStatus: req.body.mondayStatus,
            tuesdayStatus: req.body.tuesdayStatus,
            wednesdayStatus: req.body.wednesdayStatus,
            thursdayStatus: req.body.thursdayStatus,
            fridayStatus: req.body.fridayStatus,
            saturdayStatus: req.body.saturdayStatus,
            sundayStatus: req.body.saturdayStatus,
            openingTimeMonday: req.body.openingTimeMonday,
            closingTimeMonday: req.body.closingTimeMonday,
            openingTimeTuesday: req.body.openingTimeTuesday,
            closingTimeTuesday: req.body.closingTimeTuesday,
            openingTimeWednesday: req.body.openingTimeWednesday,
            closingTimeWednesday: req.body.closingTimeWednesday,
            openingTimeThursday: req.body.openingTimeThursday,
            closingTimeThursday: req.body.closingTimeThursday,
            openingTimeFriday: req.body.openingTimeFriday,
            closingTimeFriday: req.body.closingTimeFriday,
            openingTimeSaturday: req.body.openingTimeSaturday,
            closingTimeSaturday: req.body.closingTimeSaturday,
            openingTimeSunday: req.body.openingTimeSunday,
            closingTimeSunday: req.body.closingTimeSunday,
            cusinesOffered: req.body.cusinesOffered,
            specialDishOne: req.body.specialDishOne,
            specialDishTwo: req.body.specialDishTwo,
            specialDishThree: req.body.specialDishThree,
            famousFor: req.body.famousFor,
            description: req.body.description,
            year: req.body.year,
            discountToday: req.body.discountToday,
            customDiscount1: req.body.customDiscount1,
            customDiscount2: req.body.customDiscount2,
            customDiscount3: req.body.customDiscount3,
            email: req.body.email,
            contactNumbers: req.body.contactNumbers,
            bogoOn: req.body.bogoOn,
            website: req.body.website
        })
    } else {
        FoodTruck.findById(truckId)
            .then(truck => {
                truck.name = req.body.name;
                truck.address = req.body.address;
                truck.priceForTwo = req.body.priceForTwo;

                truck.openingHours[0].open = req.body.MondayStatus;
                truck.openingHours[1].open = req.body.TuesdayStatus;
                truck.openingHours[2].open = req.body.WednesdayStatus;
                truck.openingHours[3].open = req.body.ThursdayStatus;
                truck.openingHours[4].open = req.body.FridayStatus;
                truck.openingHours[5].open = req.body.SaturdayStatus;
                truck.openingHours[6].open = req.body.SundayStatus;

                truck.openingHours[0].openingTime = req.body.openingTimeMonday;
                truck.openingHours[0].closingTime = req.body.closingTimeMonday;

                truck.openingHours[1].openingTime = req.body.openingTimeTuesday;
                truck.openingHours[1].closingTime = req.body.closingTimeTuesday;

                truck.openingHours[2].openingTime = req.body.openingTimeWednesday;
                truck.openingHours[2].closingTime = req.body.closingTimeWednesday;

                truck.openingHours[3].openingTime = req.body.openingTimeThursday;
                truck.openingHours[3].closingTime = req.body.closingTimeThursday;

                truck.openingHours[4].openingTime = req.body.openingTimeFriday;
                truck.openingHours[4].closingTime = req.body.closingTimeFriday;

                truck.openingHours[5].openingTime = req.body.openingTimeSaturday;
                truck.openingHours[5].closingTime = req.body.closingTimeSaturday;

                truck.openingHours[6].openingTime = req.body.openingTimeSunday;
                truck.openingHours[6].closingTime = req.body.closingTimeSunday;

                truck.cusinesOffered = req.body.cusinesOffered;

                truck.specialDishOne = req.body.specialDishOne;
                truck.specialDishTwo = req.body.specialDishTwo;
                truck.specialDishThree = req.body.specialDishThree;

                truck.famousFor = req.body.famousFor;
                truck.description = req.body.description;
                truck.year = req.body.year;
                truck.discountToday = req.body.discountToday;

                truck.customDiscount1 = req.body.customDiscount1;
                truck.customDiscount2 = req.body.customDiscount2;
                truck.customDiscount3 = req.body.customDiscount3;

                truck.email = req.body.email;
                truck.contactNumbers = req.body.contactNumbers;

                truck.bogoOn = req.body.bogoOn;
                truck.website = req.body.website;


                truck.save()
                    .then(result => {
                        console.log(result);
                        return res.redirect('/myTrucks');
                    }).catch(err => {
                        // console.log(err);
                        console.log('Truck found but could not be updated');
                        return res.redirect('/myTrucks');
                    })
            })
            .catch(err => {
                // console.log(err);
                console.log('Truck could not be found for editing');
                return res.redirect('/myTrucks')
            })
    }
}