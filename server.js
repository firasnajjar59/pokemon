/** @format */

const dotEnv = require('dotenv');
//
dotEnv.config({ path: './config.env' });
// mongooze
const mongoose = require('mongoose');
const app = require('./app');

// connect data base
let dbUrl = process.env.DATABASE;
dbUrl = dbUrl.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`database connected!`);
    // import app
    // import dot env
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`listning at port ${port}`);
    });
  });
