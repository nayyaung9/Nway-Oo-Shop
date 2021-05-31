import { nanoid } from "nanoid";

export async function fetchAllProducts(db) {
  return db
    .collection("products")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
}

export async function fetchProductsByShop(db, shopId) {
  return db
    .collection("products")
    .find({ shopId })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();
}
export async function fetchProductById(db, productId) {
  return db
    .collection("products")
    .findOne({ _id: productId })
    .then((product) => product || null);
}

export async function createProduct(
  db,
  {
    title,
    content,
    price,
    social,
    tags,
    userId,
    shopId,
    productImages,
    delivery,
    payment,
    estimatedPrice,
  }
) {
  return db
    .collection("products")
    .insertOne({
      _id: nanoid(12),
      title,
      content,
      price,
      social,
      userId,
      tags,
      shopId,
      productImages,
      delivery,
      payment,
      estimatedPrice,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
