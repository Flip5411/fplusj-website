module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rsvp', {
        name: {
            type: DataTypes.STRING
        },
        attending: {
            type: DataTypes.BOOLEAN
        },
        beef: {
            type: DataTypes.INTEGER
        },
        fish: {
            type: DataTypes.INTEGER
        },
        pasta: {
            type: DataTypes.INTEGER
        },
        song: {
            type: DataTypes.TEXT
        }
    });
};
