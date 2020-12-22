const db = require('../config/connection');

module.exports = {
    getPeople : () => {
        return new Promise((resolve, reject) =>{
            const query = "SELECT DISTINCT photo, name from people";
            db.query(query, (err,data)=>{
                if(!err) {
                    resolve(data)
                }else{
                    reject(err)
                }
            })
        })
    },

    postPeople : (insertBody) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO people SET ?";
            db.query(query, insertBody, (err, data) =>{
                if(!err) {
                    resolve(data)
                }else{
                    reject(err)
                }
            })           
        })
    }
}