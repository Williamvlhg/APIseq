import { Sequelize } from 'sequelize';

const connection = new Sequelize("node", "root", "root", {
    host: "localhost",
    dialect: "mariadb",
    port: 8889,
})

export default connection;