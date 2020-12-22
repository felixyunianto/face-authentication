const multer = require('multer');
const path = require('path');
const form = require('./form');

const storage = multer.memoryStorage({
    destination: function(req, file,cb){
        cb(null, "./public/images-people");
    },
    filename: function (req, file, cb){
        const nameImage = `image-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, nameImage);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 200 * 1000 * 1000 }, // 200 MB
});

const uploadImage = (req, res, next) => {
    const uploadImage = upload.single("photo");
    uploadImage(req, res, (err) => {
        if(err){
            form.error(res, {
                msg: "Multer Error",
                err,
            });
        }else {
            next();
        }
    })
}

module.exports = uploadImage;