const mongoose = require('../DBSchema/SchemaMapper');
const AdminSchema = mongoose.model('Admin');
const NoticeSchema = mongoose.model('Notice');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//used for encryption and decryption
process.env.SECRET_KEY = "secret";

const AdminController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({email: data.email}).then(item => {
                if(!item){
                    bcrypt.hash(data.password, 10, (err, hash) => {

                        const newAdmin = new AdminSchema({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            NIC: data.NIC,
                            password: hash,
                            email: data.email,
                            contactNumber: data.contactNumber
                        });

                        newAdmin.save().then(() => {
                            resolve({status: 200, message: "Admin added to the system."})
                        }).catch( err => {
                            reject({status: 500, message: "Error: " + err});
                        });
                    });
                } else {
                    reject({status: 200, message: "Email is already in use."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.select = (data) => {
        return new Promise((resolve, reject) => {

            const decoded = jwt.verify(data.header['authorization'], process.env.SECRET_KEY);

            AdminSchema.findOne({_id: decoded._id}).then(admin => {
                if(admin){
                    resolve({status: 200, data: admin});
                } else {
                    reject({status: 200, message: "User does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectForLogin = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({email: data.email}).then(admin => {
                if(admin){
                    if(bcrypt.compareSync(data.password, admin.password)) {
                        const payload = {
                            _id: admin._id,
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            email: admin.email
                        };

                        let token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 1440});

                        resolve({status: 200, data: token});
                    } else {
                        reject({status: 404, message: "Incorrect Password"});
                    }
                } else {
                    reject({status: 404, message: "User does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.addNotice = (data) => {
        return new Promise((resolve, reject) => {
            const notice = new NoticeSchema({
                title: data.title,
                content: data.content,
                by: data.by
            });

            notice.save().then(() => {
                resolve({status: 200, message: "Notice Created."})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

    this.getNotice = () => {
        return new Promise((resolve, reject) => {
            NoticeSchema.find().limit(3).sort({'_id': -1}).then((data) => {
                resolve({status: 200, data: data})
            }).catch( err => {
                reject({status: 500, message: "Error: " + err});
            });
        })
    };

};

module.exports = new AdminController();