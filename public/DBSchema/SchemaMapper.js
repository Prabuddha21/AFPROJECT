const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const InstructorSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    faculty: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
});

const CourseSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: 'Instructor'
    }]
});

mongoose.model('Admin', AdminSchema);
mongoose.model('Instructor', InstructorSchema);
mongoose.model('Course', CourseSchema);

mongoose.connect('mongodb://localhost:27017/afproject', { useNewUrlParser: true}, err => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to the database');
});

module.exports = mongoose;