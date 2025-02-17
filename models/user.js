const mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    image_url: {
        type: String,
        required: true,
        default: 'http://www.terry.uga.edu/digitalmarketing/images/icons/user.jpg'
    },
    job_title: {
        type: String,
        default: ""
    },
    birthday: {
        type: String,
        // required: true
    },
    current_company: {
        type: String,
        default: ""
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    education: [{
        type: Schema.Types.ObjectId,
        ref: "Education"
    }],
    location: {
        type: String,
        default: ""
    },
    languages: [],
    connections: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    projects: [{
        project_name: String,
        development_position: String,
        code_url: String, 
        project_url: String,
        project_description: String,
        languages: String
    }],
    newUser: {
        type: Boolean,
        default: true
    }

});


UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({email: email})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = "error";
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;