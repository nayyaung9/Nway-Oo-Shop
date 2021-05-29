import nc from "next-connect";
import { all } from "@/middlewares/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  const { password, ...u } = req.user;
  res.json({ user: u });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
