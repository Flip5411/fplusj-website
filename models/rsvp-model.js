module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rsvp', {
        name: {
            type: DataTypes.STRING
        },
        attending: {
            type: DataTypes.BOOLEAN
        },
        beef: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fish: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pasta: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        song: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
};
