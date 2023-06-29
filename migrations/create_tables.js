const mysql = require('mysql2');
const util = require('util');
const config = require('config');

const connection = mysql.createConnection({
  host: config.get('mysql.host'),
  user: config.get('mysql.user'),
  password:config.get('mysql.password'),
  database: config.get('mysql.database'),
});

connection.connect = util.promisify(connection.connect);
connection.query = util.promisify(connection.query);
(async () => {
  try {
    await connection.connect();
    console.log("Connected!");

    await connection.query(`
      CREATE TABLE users (
        id int auto_increment,
        github_id varchar(255) not null,
        primary key (id)
      )    
    `);
    console.log("created table users!");
    await connection.query(`
      CREATE TABLE symbols (
        id int auto_increment,
        user_id int not null,
        symbol varchar(5) not null,
        primary key (id)
      )    
    `);
    console.log("created table symbols");
  } catch (e) {
    console.log(e);
  }
})();
