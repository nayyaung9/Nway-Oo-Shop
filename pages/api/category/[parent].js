import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchChildCategoryByParent } from "@/db/index";

const handler = nc();

handler.use(all);

// A function that fetch child categories by parent
handler.get(async (req, res) => {
  if (!req.user) return res.json({ childCategories: null });

  const { parent } = req.query;
  const childCategories = await fetchChildCategoryByParent(req.db, parent);
  res.send({ childCategories });
});

export default handler;
