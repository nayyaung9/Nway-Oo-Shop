import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchShopsByUnVerify } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ shop: null });
  const getUnVerifyShops = await fetchShopsByUnVerify(req.db);
  res.json({ shops: getUnVerifyShops });
});

export default handler;
