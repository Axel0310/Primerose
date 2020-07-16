const categoryModel = require("./../models/Category");

async function exposeCategories(req, res, next) {
  const tagsList = await categoryModel.find();
  res.locals.tagsList = tagsList;
  next();
}

module.exports = exposeCategories;
