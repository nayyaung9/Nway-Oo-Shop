import nc from "next-connect";
import { all } from "@/middlewares/index";
import { findUserById } from "@/db/index";

const handler = nc();

handler.use(all);

const maxAge = 4 * 60 * 60; // 4 hours

handler.get(async (req, res) => {
  console.log('userrr', req.query)
  const user = await findUserById(req.db, req.query.userId);
  if (user) res.setHeader("cache-control", `public, max-age=${maxAge}`);
  res.send({ user });
});

export default handler;
