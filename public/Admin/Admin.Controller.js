const mongoose = require('../DBSchema/SchemaMapper');
const AdminSchema = mongoose.model('Admin');
const NoticeSchema = mongoose.model('Notice');
const InstructorSchema = mongoose.model('Instructor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('./NodeMailer');

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
                            const mail = {
                                email: data.email,
                                subject: "Added To The System",
                                body: `<p>This mail is sent to confirm you that you have been added as an Administrator for the system.</p>
                                    <br>
                                    <p><b>Credentials: </b></p>
                                    <p>Username: ${data.email}  password: ${data.password}</p>`
                            };
                            nodeMailer.sendMail(mail);
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

    this.insertInstructor = (data) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findOne({email: data.email}).then(item => {
                if(!item){
                    bcrypt.hash(data.password, 10, (err, hash) => {

                        const newInstructor = new InstructorSchema({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            designation: data.designation,
                            faculty: data.faculty,
                            password: hash,
                            email: data.email,
                            contactNumber: data.contactNumber
                        });

                        newInstructor.save().then(() => {
                            const mail = {
                                email: data.email,
                                subject: "Added To The System",
                                body: `<p>This mail is sent to confirm you that you have been added as an Instructor for the system.</p>
                                    <br>
                                    <p><b>Credentials: </b></p>
                                    <p>Username: ${data.email}  password: ${data.password}</p>`
                            };
                            nodeMailer.sendMail(mail);
                            resolve({status: 200, message: "Instructor added to the system."});
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

    this.update = (data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    if(this.findEmail(data.email)) {
                        bcrypt.hash(data.password, 10, (err, hash) => {

                            let updateAdmin = {};
                            if(data.password == null) {
                                updateAdmin = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    NIC: data.NIC,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            } else {
                                updateAdmin = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    NIC: data.NIC,
                                    password: hash,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            }

                            AdminSchema.updateOne({_id: data._id}, updateAdmin).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        });
                    } else {
                        reject({status: 200, message: "Email Already In Use."});
                    }
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.updateInstructor = (data) => {
        return new Promise((resolve, reject) => {
            InstructorSchema.findOne({_id: data._id}).then(item => {
                if(item){
                    if(this.findEmail(data.email)) {
                        bcrypt.hash(data.password, 10, (err, hash) => {

                            let updateInstructor = {};
                            if(data.password == null) {
                                updateInstructor = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    designation: data.designation,
                                    faculty: data.faculty,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            } else {
                                updateInstructor = {
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    designation: data.designation,
                                    faculty: data.faculty,
                                    password: hash,
                                    email: data.email,
                                    contactNumber: data.contactNumber
                                };
                            }

                            InstructorSchema.updateOne({_id: data._id}, updateInstructor).then(data => {
                                resolve({status: 200, message: "Update Successful."})
                            }).catch(err => {
                                reject({status: 500, message: "Error: " + err});
                            });
                        });
                    } else {
                        reject({status: 200, message: "Email Already In Use."});
                    }
                } else {
                    reject({status: 404, message: "Something went wrong."});
                }
            }).catch(err => {
                reject({status: 500, message: "Error: " + err});
            });
        });
    };

    this.select = (data) => {
        return new Promise((resolve, reject) => {
            const decoded = jwt.verify(data.token, process.env.SECRET_KEY);
            AdminSchema.findOne({_id: decoded._id}).then(admin => {
                if(admin){
                    resolve({status: 200, data: admin});
                } else {
                    reject({status: 404, message: "Admin does not exist."});
                }
            }).catch( err => {
                reject({status: 500, message: "Error: " + err})
            });
        });
    };

    this.selectInstructor = (data) => {
        return new Promise((resolve, reject) => {
            const email = data.email;
            InstructorSchema.findOne({email: email}).then(item => {
                if(item){
                    resolve({status: 200, data: item});
                } else {
                    reject({status: 404, message: "Instructor does not exist."});
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
                    reject({status: 404, message: "Admin does not exist."});
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

    this.findEmail = (email) => {
            return AdminSchema.findOne({email: email}).then(data => {
                if(data){
                    return false;
                } else {
                    return true;
                }
            })
    }
};

module.exports = new AdminController();