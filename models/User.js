const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin'], // only allow user or admin roles
        default : 'user'
    },
    lastLogin : {
        type: Date,   // store the last login timestamp
        default: null
    }
},{timestamps : true});
/*
When you pass { timestamps: true } as the second argument in a Mongoose schema, it automatically adds two fields to every document in that collection:

createdAt – The date & time when the document was first created.
updatedAt – The date & time when the document was last modified (updated).

{
  "_id": "66c62423f8ab23456d90e111",
  "username": "Ganesh",
  "email": "ganesh@example.com",
  "createdAt": "2025-08-21T15:45:00.123Z",
  "updatedAt": "2025-08-21T15:45:00.123Z",
  "__v": 0
}

*/

module.exports = mongoose.model('User',UserSchema);