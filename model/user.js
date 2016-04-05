var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    local: {
        email: {type: String, required: true},
        password: {type: String, required: true},
    }
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//userSchema.methods.isInRole = function(role){
   //return this.roles.indexOf(role) > -1
//};

module.exports = mongoose.model('User', userSchema);
