const peopleModel = require('../models/people');
const form = require('../helpers/form');

module.exports = {
    getPeople: (req, res) => {
        peopleModel
            .getPeople()
            .then((data) => {
                form.success(res,data)
            })
            .catch((err) => {
                form.error(res, err);
            })
    },
    postPeople : (req, res) => {
        const buffer = req.file.buffer;
        const newBuffer = Buffer.from(buffer)
        const insertBody = {
            name: req.body.name,
            photo: newBuffer
        }

        peopleModel
            .postPeople(insertBody)
            .then((data) => {
                res.redirect('/');
            })
            .catch((err) => {
                form.error(res, err);
            })
    }
}