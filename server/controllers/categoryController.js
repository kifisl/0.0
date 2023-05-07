const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class categoryController {
  async addCategory(req, res) {
    try {
      let { name } = req.body;
      const addedCategory = await conn.productcategories.create({
        data: {
          CategoryName: name,
        },
      });
      res.status(200).json({ addedCategory });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getCategory(req, res) {
    try {
      const categories = await conn.productcategories.findMany({});
      res.status(200).json({ categories });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getCategoryByID(req, res) {
    try {
      let id = req.params.id;
      const category = await conn.productcategories.findFirst({
        where: {
          CategoryID: Number.parseInt(id),
        },
      });
      res.status(200).json({ category });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async edit(req, res) {
    try {
      let { name, id } = req.body;
      const edited = await conn.productcategories.update({
        where: { CategoryID: Number.parseInt(id) },
        data: {
          CategoryName: name,
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
      const deleted = await conn.productcategories.delete({
        where: {
          CategoryID: Number.parseInt(id),
        },
      });
      res.status(200).json({ deleted });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new categoryController();
