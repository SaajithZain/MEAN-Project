var mongoose =  require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Test',(err) => {
    if (err) {
        console.log('Failed to connect to database');
        process.exit(-1);
    }
    else {
        console.log('Connected to database');
    }
})

module.exports = mongoose;