import nc from "next-connect";
import { all } from "@/middlewares/index";
import { createCategory } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const newCatelog = await createCategory(req.db, req.body);
  res.status(201).json({ newCatelog });
});

export default handler;
