import nc from "next-connect";
import { all } from "@/middlewares/index";
import { fetchProductsByParentCategory } from "@/db/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { parentCategoryId } = req.query;

  const products = await fetchProductsByParentCategory(
    req.db,
    parentCategoryId
  );
  res.status(201).json({ products });
});

export default handler;
