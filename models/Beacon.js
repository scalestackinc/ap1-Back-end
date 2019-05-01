const AirportModel = require('./Airport');

module.exports = (sequelize, type) => {
  return sequelize.define('beacon', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: type.STRING,
    major: type.INTEGER,
    minor: type.STRING,
    proximity: type.STRING
  });
  airport.hasMany(uuid);
  uuid.belongsTo(airport);
};