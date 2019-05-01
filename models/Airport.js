module.exports = (sequelize, type) => {
  return sequelize.define('airport', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    gate: type.INTEGER,
    city: type.STRING
  });
};

// sls offline start--skipCacheInvalidation
