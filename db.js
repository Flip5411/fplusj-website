var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect': 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/rsvp-data.sqlite'
    });
}

var db = {};

db.rsvp = sequelize.import(__dirname + '/models/rsvp-model.js');
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
