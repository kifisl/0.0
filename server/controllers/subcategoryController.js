const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class subcategoryController {
  async addSubCategory(req, res) {
    try {
      let { name, categoryID } = req.body;
      const addedSubCategory = await conn.productsubcategories.create({
        data: {
          SubCategoryName: name,
          ParentCategoryID: categoryID,
        },
      });
      res.status(200).json({ addedSubCategory });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getSubCategory(req, res) {
    try {
      const subcategories = await conn.productsubcategories.findMany({});
      res.status(200).json({ subcategories });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getSubCategoryByID(req, res) {
    try {
      let id = req.params.id;
      const subcategory = await conn.productsubcategories.findFirst({
        where: {
          SubCategoryID: Number.parseInt(id),
        },
      });
      res.status(200).json({ subcategory });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async edit(req, res) {
    try {
      let { name, id } = req.body;
      const edited = await conn.productsubcategories.update({
        where: { SubCategoryID: Number.parseInt(id) },
        data: {
          SubCategoryName: name,
        },
      });
      res.status(200).json({ edited });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async delete(req, res) {
    try {
      let { id } = req.body;
      const deleted = await conn.productsubcategories.delete({
        where: {
          SubCategoryID: Number.parseInt(id),
        },
      });
      res.status(200).json({ deleted });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new subcategoryController();
