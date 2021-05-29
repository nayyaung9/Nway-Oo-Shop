import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const handler = nc();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/products",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

cloudinary.config({
  cloud_name: "dw6xhvlph",
  api_key: "363923182319938",
  api_secret: "JLIo4SQKqotSpWLeO8y4CXke-Es",
});

handler.use(all);

handler.patch(upload.single("productImage"), async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  let productImage;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: "fill",
    });
    productImage = image.secure_url;
  }

  res.json({ image: productImage });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
