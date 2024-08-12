const {Sequelize, DataTypes} = require('sequelize')
const fs = require('fs')
const database = require('../../config/database')
const path = require('path')

const environment = process.env.NODE_ENV
const databaseConfig = database[environment]

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect
})

const db = {
    sequelize,
    Sequelize
}

const indexfile = path.basename(__filename)
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== indexfile) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize.sync({force: false})
            .then(() => console.log('Database sync completed'))
            .catch(error => console.log(error))

module.exports = db;