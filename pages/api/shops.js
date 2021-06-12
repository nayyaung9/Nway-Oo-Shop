import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchAllShops } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const shops = await fetchAllShops(req.db);

  res.send({ shops });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
