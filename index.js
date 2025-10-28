const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ======================= ROUTES =======================

// GET semua komik
app.get('/komik', async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.status(200).send(komik);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST tambah komik
app.post('/komik', async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.status(201).send(komik);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PUT update komik
app.put('/komik/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send({ message: 'Komik not found' });
    }

    await komik.update(data);
    res.send({ message: 'Komik berhasil diupdate', komik });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE hapus komik
app.delete('/komik/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send({ message: 'Komik not found' });
    }

    await komik.destroy();
    res.send({ message: 'Komik deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ======================= SERVER START =======================
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Database connection error:', err.message);
  });
