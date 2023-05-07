const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class SearchService {
  async processUrl(req) {
    const { productName, category, subcategory } = req.query;
    return { productName, category, subcategory };
  }

  async search(props) {
    const searchResult = await conn.products.findMany({
      where: {
        ProductName: props.productName,
        productcategories_products_ProductCategoryToproductcategories: {
          CategoryName: props.category,
        },
        productsubcategories_products_ProductSubCategoryToproductsubcategories:
          {
            SubCategoryName: props.subcategory,
          },
      },
    });
    return searchResult;
  }

  async selectAllCategories() {
    const allCategories = await conn.productcategories.findMany();
    return allCategories;
  }

  async selectAllSubcategories() {
    const allSubcategories = await conn.productsubcategories.findMany();
    return allSubcategories;
  }

  async selectSubcategoriesByCategory(categoryID) {
    const subcategories = await conn.productsubcategories.findMany({
      where: {
        ParentCategoryID: Number.parseInt(categoryID),
      },
    });
    return subcategories;
  }

  async productsByCategory(categoryID) {
    const products = await conn.products.findMany({
      where: {
        ProductCategory: Number.parseInt(categoryID),
      },
    });
    return products;
  }

  async productsBySubcategory(subcategoryID) {
    const products = await conn.products.findMany({
      where: {
        ProductSubCategory: Number.parseInt(subcategoryID),
      },
    });
    return products;
  }
}

module.exports = new SearchService();
