const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
},{
    timestamps:true
});

UserSchema.pre('save', function() {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;