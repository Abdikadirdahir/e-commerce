const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
Tag.findAll({
      include:  [{ model: Product, through: ProductTag, as: 'tag_id' }]
    }).then(data => {
      res.status(200).json(data);
    }).catch (err => {
    res.status(500).json(err);
    })
  })
;

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product, through: Tag, as: 'tag' }],
  })
    .then((tag) => res.json(tag))
    .catch((err) => res.status(400).json(err));
    
});

router.post('/', (req, res) => {
  try {
    const tagData =  Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  try {
    const tagData =  Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
