import nc from "next-connect";
import { all } from "@/middlewares/index";
import { searchProductByName } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { product } = req.query;
  const products = await searchProductByName(req.db, product);

  res.send({ products });
});

export default handler;
