import nc from "next-connect";
import bcrypt from "bcryptjs";
import { all } from "@/middlewares/index";
import { registerUser, findUserByEmail } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { email, fullname, password } = req.body;

  if (!password || !fullname) {
    res.status(400).send("Missing field(s)");
    return;
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send("The email has already been used.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await registerUser(req.db, {
    email,
    password: hashedPassword,
    fullname,
  });

  // req.logIn(user, (err) => {
  //   if (err) throw err;
  //   res.status(201).json({
  //     user: req.user
  //   });
  // });
  
  res.status(201).json({ user });
});

export default handler;
