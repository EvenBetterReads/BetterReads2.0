const path = require('path');
const fs = require('fs');
const secrets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../secrets/secrets.json')),
);
const MONGO_URI = secrets.mongoDBURI;

const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betterReads',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'book' },
    },
  ],
});

userSchema.pre('save', function (next) {
  const user = this;
  // this is only needed if user can modify password
  if (!user.isModified('password')) return next();

  //generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    //hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// method for comparing password with stored hash
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('user', userSchema);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('session', sessionSchema);

const bookSchema = new Schema({
  username: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  summary: String,
  review: Number,
});

const Book = mongoose.model('book', bookSchema);

module.exports = { User, Book, Session };
