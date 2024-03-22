const express = require('express');
const router = express.Router();
const uploadController = require('../Controller/uploadImage');

router.post('/upload-images/:imageType', uploadController.postUploadImages);
router.get('/upload-images/:truckId', uploadController.getImagesPage);

router.get('/upload-images/:truckId/mainImage', uploadController.getUploadMainImagePage);
router.post('/upload-images/:truckId/mainImage', uploadController.getUploadMainImagePage);


module.exports = router;
