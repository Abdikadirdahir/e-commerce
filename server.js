//make our models based off the readme / use activity 28 for inspiration
//create routes one at a time / test as we go

// WHEN I enter the command to invoke the application
// THEN my server is started and the Sequelize models are synced to the MySQL database
// WHEN I open API GET routes in Insomnia Core for categories, products, or tags
// THEN the data for each of these routes is displayed in a formatted JSON
// WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
// THEN I am able to successfully create, update, and delete data in my database




const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
