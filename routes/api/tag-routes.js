const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// FindAll
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

// Find Single Tag by ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

// Post request to create new tags
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

// PUT request to update a tag's name by it's ID 
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

// DELETE request to allow user to delete a tag by it's ID 
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
