const FoodTruck = require('../Model/foodTruck')

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const foodTruck = require('../Model/foodTruck');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = `./Public/uploads/${req.session.user._id}/${file.fieldname}`;
    // Create the directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        cb(err, null);
      } else {
        cb(null, uploadDir);
      }
    });
  },
  filename: function (req, file, cb) {
    // Extract the file extension
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 20000000 } // 20 MB file size limit
}).fields([
  { name: 'bannerImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 5 },
  { name: 'menuImages', maxCount: 5 },
  { name: 'specialThree1', maxCount: 1 },
  { name: 'specialThree2', maxCount: 1 },
  { name: 'specialThree3', maxCount: 1 }
]);

// Your controller actions
exports.postUploadImages = (req, res, next) => {
  // const imageType = req.params.imageType;
  const foodTruckId = req.params.truckId;

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      console.log('Could not upload');
      return res.redirect('/pageNotFound');
    } else {
      // Files uploaded successfully
      const bannerImage = req.files['bannerImage'][0];
      const galleryImages = req.files['galleryImages'];
      const menuImages = req.files['menuImages'];
      const foodTruckId = req.body.foodTruckId;
      console.log(foodTruckId);
    }
  });
}



exports.getImagesPage = (req, res, next) => {
  const truckId = req.params.truckId;
  FoodTruck.findById(truckId)
    .then(truck => {
      if (!truck) {
        console.log('Error: Food truck not found with the provided ID.');
        return res.redirect('/pageNotFound');
      }

      return res.render('dashboard/managingImages/addImages', {
        pageTitle: 'Upload Images',
        foodTruckId: truckId,
        truck: truck,
        pageType: 'showImages'
      });
    })
    .catch(err => {
      // Handle other errors, such as invalid MongoDB ObjectID
      console.log('Error:', err.message);
      return res.redirect('/pageNotFound');
    });
};


exports.getUploadMainImagePage = (req, res, next) => {
  const truckId = req.params.truckId;
  FoodTruck.findById(truckId)
    .then(truck => {
      if (!truck) {
        console.log('Error: Food truck not found with the provided ID.');
        return res.redirect('/pageNotFound');
      }

      return res.render('dashboard/managingImages/addImages', {
        pageTitle: 'Upload Images',
        foodTruckId: truckId,
        truck: truck,
        pageType: 'UploadMainImage'
      });
    })
    .catch(err => {
      // Handle other errors, such as invalid MongoDB ObjectID
      console.log('Error:', err.message);
      console.log('Error: Food truck not found with the provided ID.');
      return res.redirect('/pageNotFound');
    });
}