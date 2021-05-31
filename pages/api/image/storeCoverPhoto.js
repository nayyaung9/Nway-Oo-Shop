import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { updateShop } from "@/db/index";

const handler = nc();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/store/cover",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

cloudinary.config({
  cloud_name: "dw6xhvlph",
  api_key: "363923182319938",
  api_secret: "JLIo4SQKqotSpWLeO8y4CXke-Es",
});

handler.use(all);

handler.patch(upload.single("storeCoverPhoto"), async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  let storeCoverPhoto;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: "fill",
    });
    storeCoverPhoto = image.secure_url;
  }

  const { shopId } = req.body;

  const data = await updateShop(req.db, { _id: shopId, storeCoverPhoto });
  res.json({ data });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
