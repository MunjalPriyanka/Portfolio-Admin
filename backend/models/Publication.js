const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const PublicationSchema = new Schema({
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

const Publication = mongoose.model('publication', PublicationSchema);
module.exports = Publication;
