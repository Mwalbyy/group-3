const router = require("express").Router();
const { Category, Product, User, Review } = require("../models");

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'image'],
        },
      ],
    });

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
      );
      // console.log(categories[0].products)
    res.render("homepage", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render("signup")
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
