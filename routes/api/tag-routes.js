const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    );
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.json(tag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    );
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.json(tag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    );
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((tag) => res.json(tag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    );
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then((tag) => res.json(tag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    }
    );
});

module.exports = router;
