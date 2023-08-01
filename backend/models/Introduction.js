const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const IntroductionSchema = new Schema({
 
    description: {
        type: 'string',
        require: true,
    },
  
})

const Introduction = mongoose.model('introduction', IntroductionSchema);
module.exports = Introduction;
