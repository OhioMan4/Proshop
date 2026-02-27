const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) { cb(null, 'uploads/'); },
  filename(req, file, cb) { cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  if (filetypes.test(path.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype)) {
    return cb(null, true);
  }
  cb('Images only!');
};

const upload = multer({ storage, fileFilter });
router.post('/', upload.single('image'), (req, res) => res.send(`/${req.file.path}`));

module.exports = router;
