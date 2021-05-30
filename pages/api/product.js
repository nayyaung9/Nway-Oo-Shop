import nc from "next-connect";
import { all } from "@/middlewares/index";
import { createProduct } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    title,
    content,
    price,
    social,
    userId,
    shopId,
    productImages,
    delivery,
    payment,
  } = req.body;
  const newShop = await createProduct(req.db, {
    title,
    content,
    price,
    social,
    userId,
    shopId,
    productImages,
    delivery,
    payment,
  });
  res.status(201).json({ newShop });
});

export default handler;
