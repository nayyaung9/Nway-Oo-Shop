import { nanoid } from "nanoid";

/**
 * POST /api/category/index
 * Return the newly created category
 */
export async function createCategory(db, data) {
  return db
    .collection("categories")
    .insertOne({
      _id: nanoid(12),
      name: data?.name,
      parent: data?.parent,
      path: data?.path,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}

/**
 * GET /api/category/parent
 * Return the parent categories
 */
export async function fetchParentCategories(db) {
  return db.collection("categories").find({ parent: "/" }).toArray();
}

/**
 * GET /api/category/child
 * Return the child category of request category ( Parent )
 */
export async function fetchChildCategoryByParent(db, data) {
  const text = `/${data}`;
  return db.collection("categories").find({ parent: text }).toArray();
}

/**
 * GET /api/category/products/:categoryId
 * Return the products that belongs to requested parent category
 */
export async function fetchProductsByParentCategory(db, data) {
  return db
    .collection("products")
    .find({ categoryName: data })
    .sort({ createdAt: -1 })
    .limit(12)
    .toArray();
}

/**
 * GET /api/category/all
 * Return all the categories
 */
export async function fetchAllCategories(db) {
  return db.collection("categories").find().limit(12).toArray();
}
