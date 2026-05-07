const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM animes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM animes WHERE id=?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Anime not found'
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      studio,
      episodes,
      rating,
      image,
      description,
      likes
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO animes
      (title, studio, episodes, rating, image, description, likes)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        studio,
        episodes,
        rating,
        image,
        description,
        likes
      ]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Anime created'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {

    const {
      title,
      studio,
      episodes,
      rating,
      image,
      description,
      likes
    } = req.body;

    await db.query(
      `UPDATE animes
      SET
      title=?,
      studio=?,
      episodes=?,
      rating=?,
      image=?,
      description=?,
      likes=?
      WHERE id=?`,
      [
        title,
        studio,
        episodes,
        rating,
        image,
        description,
        likes,
        req.params.id
      ]
    );

    res.json({
      message: 'Anime updated'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {

    await db.query(
      'DELETE FROM animes WHERE id=?',
      [req.params.id]
    );

    res.json({
      message: 'Anime deleted'
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;