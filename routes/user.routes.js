import express from "express";
import db from "../config/db.config.js";

const router = express.Router();

// metodo get (leer)
router.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
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
router.post('/post', (req, res) => {
  const { user } = req.body;
  console.log(user);
  
  const query = 'INSERT INTO usuarios (user) VALUES (?)';
  db.query(query, [user], (error, results) => {
    if (error) {
      console.error('Error al insertar usuario: ', error);
      res.status(500).json({ error: 'Error al insertar usuario' });
    } else {
      res.status(201).json({ message: 'Usuario creado correctamente', id: results.insertID });
    }
  });
});

// metodo put (actualizar)
router.put('/put/id_user/:id_user', (req, res) => {
  console.log("im in");
  
  const { id_user } = req.params;           // Tomamos el ID de la URL
  console.log(id_user);
  
  const { user } = req.body;           // Tomamos el 'user' del body
  const query = 'UPDATE usuarios SET user = ? WHERE id_user = ?';

  db.query(query, [user, id_user], (error, result) => {
    if (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    } else if (result.affectedRows === 0) {
      // Si no se modifica ninguna fila, es que no se encontró el usuario
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario actualizado correctamente' });
    }
  });
});

// metodo delete (eliminar)
router.delete('/delete/id_user/:id_user', (req, res) => {

  const { id_user } = req.params;               // tomamos el ID de la URL
  console.log(id_user);

  const query = 'DELETE FROM usuarios WHERE id_user = ?';

  db.query(query, [id_user], (error, result) => {
    if (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json({ message: 'Usuario eliminado correctamente' });
    }
  });
});

export default router;
