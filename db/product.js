import { nanoid } from "nanoid";

// export async function fetchYourShopByUserId(db, userId) {
//   return db
//     .collection("shops")
//     .findOne({ shopOwnerId: userId })
//     .then((shop) => shop || null);
// }

// export async function fetchShopById(db, shopId) {
//   return db
//     .collection("shops")
//     .findOne({
//       _id: shopId,
//     })
//     .then((shop) => shop || null);
// }
export async function createProduct(
  db,
  { title, content, price, social, userId, shopId }
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
      shopId,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
