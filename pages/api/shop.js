import nc from "next-connect";
import { all } from "@/middlewares/index";
import { registerShop } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { shopname, phoneNumber, shopOwnerId } = req.body;

  const newShop = await registerShop(req.db, {
    shopname,
    phoneNumber,
    shopOwnerId,
  });
  res.status(201).json({ newShop });
});

export default handler;
