import nc from "next-connect";
import { all } from "@/middlewares/index";
import passport from "middlewares/passport";

const handler = nc();

handler.use(all);

handler.post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
