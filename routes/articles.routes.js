import express from "express";
import db from "../config/db.config.js";

const router = express.Router();

// metodo get (leer)
router.get('/articulos', (req, res) => {
  const query = 'SELECT * FROM articulos';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta: ', error);
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
});

// metodo post (crear)
router.post('/post/article', (req, res) => {
  const { article } = req.body;
  const { price } = req.body;
  
 const query = 'INSERT INTO articulos (article, price) VALUES (?, ?)';
  db.query(query, [article, price], (error, results) => {
    if (error) {
      console.error('Error al insertar usuario: ', error);
      res.status(500).json({ error: 'Error al insertar articulo' });
    } else {
      res.status(201).json({ message: 'Articulo creado correctamente', id: results.insertID });
    }
  });
});

// metodo put (actualizar)
router.put('/put/articulos/:id_article', (req, res) => {
  
  const { id_article } = req.params;           // Tomamos el ID de la URL
  const { price } = req.body;           // Tomamos el 'article' del body

const query = 'UPDATE articulos SET price = ? WHERE id_article = ?';

  db.query(query, [price, id_article], (error, result) => {
    if (error) {
      console.error('Error al actualizar articulo:', error);
      res.status(500).json({ error: 'Error al actualizar articulo' });
    } else if (result.affectedRows === 0) {
      // Si no se modifica ninguna fila, es que no se encontró el usuario
      res.status(404).json({ error: 'Articulo no encontrado' });
    } else {
      res.json({ message: 'Articulo actualizado correctamente' });
    }
  });
});

// metodo delete (eliminar)
router.delete('/delete/id_article/:id_article', (req, res) => {

  const { id_article } = req.params;               // tomamos el ID de la URL

  const query = 'DELETE FROM articulos WHERE id_article = ?';

  db.query(query, [id_article], (error, result) => {
    if (error) {
      console.error('Error al eliminar articulos:', error);
      res.status(500).json({ error: 'Error al eliminar articulo' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Articulo no encontrado' });
    } else {
      res.json({ message: 'Articulo eliminado correctamente' });
    }
  });
});

export default router;