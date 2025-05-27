import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/libros', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelo de Libro
const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  genero: String,
  anio: Number,
});

const Libro = mongoose.model('Libro', libroSchema);

// Rutas
app.get('/libros', async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

app.post('/libros', async (req, res) => {
  const nuevoLibro = new Libro(req.body);
  await nuevoLibro.save();
  res.json(nuevoLibro);
});

app.delete('/libros/:id', async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Libro eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

