
const multer = require('multer');

exports.uploadImage = multer({
  storage: multer.memoryStorage({
    destination: (req, file, callback) => callback(null, ''),
  }),
}).single('blogImage');
