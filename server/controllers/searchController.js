const searchService = require("../service/searchService");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class SearchController {
  async searchByName(req, res) {
    const { query } = req.query;
    const result = await conn.products.findMany({
      where: {
        ProductName: {
          contains: query,
        },
      },
    });

    return res.status(200).json({ result });
  }
  async testGet(req, res) {
    const result = await searchService.search(
      await searchService.processUrl(req)
    );
    return res.status(200).json({ result });
  }
  async findAllCategories(req, res) {
    const result = await searchService.selectAllCategories();
    return res.status(200).json({ result });
  }
  async findAllSubcategories(req, res) {
    const result = await searchService.selectAllSubcategories();
    return res.status(200).json({ result });
  }

  async refreshSubcategories(req, res) {
    const result = await searchService.selectSubcategoriesByCategory(
      req.body.categoryID
    );
    return res.status(200).json({ result });
  }

  async findProductsByCategory(req, res) {
    const result = await searchService.productsByCategory(req.body.categoryID);
    return res.status(200).json({ result });
  }

  async findProductsBySubCategory(req, res) {
    const result = await searchService.productsBySubcategory(
      req.body.subcategoryID
    );
    return res.status(200).json({ result });
  }
}

module.exports = new SearchController();
