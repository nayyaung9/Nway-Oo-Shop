fetchAllProducts;

import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchAllProducts } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const products = await fetchAllProducts(req.db);

  res.send({ products });
});

export default handler;
