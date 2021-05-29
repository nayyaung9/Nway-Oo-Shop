import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchYourShopByUserId } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ shop: null });

  const getShop = await fetchYourShopByUserId(req.db, req.query.shopId);
  res.json({ shop: getShop });
});

export default handler;
