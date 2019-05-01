const AirportModel = require('./Beacon');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        device: type.STRING,
        entry: type.DATE,
        exit: type.DATE
    });
    beacon.belongsTo(username);
    username.belongsTo(beacon);
};