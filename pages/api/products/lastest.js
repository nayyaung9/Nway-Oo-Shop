import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchLastestProducts } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const products = await fetchLastestProducts(req.db);

  res.send({ products });
});

export default handler;
