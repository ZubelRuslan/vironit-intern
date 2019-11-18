const router = require('./routers/myRouter');
const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', router);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ra44o:rak1997@vironit-intern-ayhnq.mongodb.net/users',
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) {
          throw new Error(err);
        }
        console.log('Database is connected');
      }
    );
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();