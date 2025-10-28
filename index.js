const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server Started');
  });
})
.catch(err => {
  console.log(err);
});
