import nc from "next-connect";
import { all } from "@/middlewares/index";
import { createProduct } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const newShop = await createProduct(req.db, req.body);
  res.status(201).json({ newShop });
});

export default handler;
