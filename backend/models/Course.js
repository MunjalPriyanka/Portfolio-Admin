const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title: {
        type: 'string',
        require: true,
    },
    description: {
        type: 'string',
        require: true,
    },
    link: {
        type: 'string',
        require: true,
    },
})

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;
