import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchProductsByShop } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ shop: null });
  const getShopProducts = await fetchProductsByShop(req.db, req.body.shopId);
  res.json({ products: getShopProducts });
});

export default handler;
