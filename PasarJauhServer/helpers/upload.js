const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(" ", "-")}`);
  }
});

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (req.files) cb(null, Boolean(file.mimetype.match("image/*")));
    else cb(null, false);
  },
  limits: { fileSize: 25 * 1024 * 1024 }
});
