import nc from "next-connect";
import { all } from "@/middlewares/index";
import { updateProduct } from "@/db/index";

const handler = nc();

handler.use(all);

handler.put(async (req, res) => {
  const updatedProduct = await updateProduct(req.db, req.body);
  res.status(201).json({ updatedProduct });
});

export default handler;
