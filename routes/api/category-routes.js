const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const cateogryData = await Category.findByPk(req.params.id, {
  
      include: [{ model: Product, through: Trip, as: '' }]
    });

    if (!cateogryData) {
      res.status(404).json({ message: '' });
      return;
    }

    res.status(200).json(cateogryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const cateogryData = await Category.create(req.body);
    res.status(200).json(cateogryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cateogryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!cateogryData) {
      res.status(404).json({ message: '' });
      return;
    }

    res.status(200).json(cateogryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
