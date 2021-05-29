import { nanoid } from "nanoid";

export async function fetchYourShopByUserId(db, userId) {
  return db
    .collection("shops")
    .findOne({ shopOwnerId: userId })
    .then((shop) => shop || null);
}

export async function fetchShopById(db, shopId) {
  return db
    .collection("shops")
    .findOne({
      _id: shopId,
    })
    .then((shop) => shop || null);
}
export async function registerShop(db, { shopname, phoneNumber, shopOwnerId }) {
  return db
    .collection("shops")
    .insertOne({
      _id: nanoid(12),
      shopname,
      phoneNumber,
      shopOwnerId,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
