const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'KanBanBoard',
    username: 'postgres',
    password: 'password',
    ssl: {
        rejectUnauthorized: false, // For self-signed certificates or other SSL issues, set this to false
    },
    define: {
        timestamps: true, // Set to true if you want Sequelize to automatically add timestamps (createdAt, updatedAt) to your models
    },
});

module.exports = sequelize;
