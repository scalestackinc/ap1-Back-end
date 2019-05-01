const Sequelize = require('sequelize');
const AirportModel = require('./models/Airport');
const BeaconModel = require('./models/Beacon');
const UserModel = require('./models/User');

// Connecting to DB
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);


const Airport = AirportModel(sequelize, Sequelize);
const Beacon = BeaconModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Models = {Airport, Beacon, User};
const connection = {};

module.exports = async () => {
  if(connection.isConnected) {
    console.log('=> Using existing connection.');
    return Models;
  }

  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log('=> Created a new connection.');
  return Models;
}

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

