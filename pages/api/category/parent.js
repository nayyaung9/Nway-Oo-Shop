import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchParentCategories } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const catelogs = await fetchParentCategories(req.db);

  res.send({ catelogs });
});

export default handler;
