import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchAllCategories } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const catelogs = await fetchAllCategories(req.db);

  res.send({ catelogs });
});

export default handler;
