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
})

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.Komik.create(data);
        res.send(komik);
    } catch (error) {
        res.status(500).send({ messafe: error.message });
    }
});

app.put('/komik/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const komik = await db.Komik.findByPk(id);
    if(!komik) {
      return res.status(404).send({message: 'Komik not found'});
    }
    
    await komik.update(data);
    res.send({message: "Komik berhasil diupdate", komik});
  } catch (error) {
    res.send(error);
  }
});
