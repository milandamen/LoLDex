var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required: true},
    roles: [{type: String}]
})

//methods , niet method!
userSchema.methods.isInRole = function(role){
   return this.roles.indexOf(role) > -1
}

mongoose.model('User', userSchema);
