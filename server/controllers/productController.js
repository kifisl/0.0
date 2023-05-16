const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class productController {
  async addProduct(req, res) {
    try {
      let name = req.body.name;
      let { price, weight, short_desc } = req.body;
      console.log("name: " + name);
      console.log("price: " + price);
      console.log("weight: " + weight);
      console.log("short_desc: " + short_desc);
      let fileName;
      console.log(req.body);
      console.log(req.headers);
      if (req.file) {
        fileName = req.file.filename;
      }
      const addedProduct = await conn.products.create({
        data: {
          ProductName: String(name),
          ProductWeight: Number.parseInt(weight),
          ProductShortDesc: String(short_desc),
          ProductImage: fileName,
          ProductPrice: Number.parseFloat(price),
        },
      });
      res.status(200).json({ addedProduct });
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await conn.products.findMany({});
      res.status(200).json({ products });
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async getProductByID(req, res) {
    try {
      let { id } = req.body;
      const product = await conn.products.findFirst({
        where: {
          ProductID: Number.parseInt(id),
        },
        include: {
          productcategories_products_ProductCategoryToproductcategories: {
            select: {
              CategoryName: true,
            },
          },
          productsubcategories_products_ProductSubCategoryToproductsubcategories:
            {
              select: {
                SubCategoryName: true,
              },
            },
        },
      });

      res.status(200).json({ product });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async editProduct(req, res) {
    try {
      let { updateName, id, updatePrice, update_desc, updateWeight } = req.body;
      let update;
      if (req.file) {
        let fileName = req.file.filename;
      }
      if (req.file) {
        update = await conn.products.update({
          where: { ProductID: Number.parseInt(id) },
          data: {
            ProductName: String(updateName),
            ProductPrice: Number.parseFloat(updatePrice),
            ProductImage: req.file.filename,
            ProductShortDesc: String(update_desc),
            ProductWeight: Number.parseInt(updateWeight),
          },
        });
      } else {
        update = await conn.products.update({
          where: { ProductID: Number.parseInt(id) },
          data: {
            ProductName: String(updateName),
            ProductPrice: Number.parseFloat(updatePrice),
            ProductShortDesc: String(update_desc),
            ProductWeight: Number.parseInt(updateWeight),
          },
        });
      }
      res.status(200).json({ update });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getPagination(req, res) {
    try {
      let { offset, take } = req.body;
      const result = await conn.products.findMany({
        skip: Number.parseInt(offset),
        take: Number.parseInt(take),
      });
      res.status(200).json({ result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      let { id } = req.body;
      const result = await conn.products.delete({
        where: {
          ProductID: Number.parseInt(id),
        },
      });
      res.status(200).json({ result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new productController();
