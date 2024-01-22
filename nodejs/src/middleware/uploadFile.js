const multer = require("multer");

const file = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname.replace(/\s/g, ""))
    }
})

const upload = multer({
    storage: file
})

module.exports = upload