import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { updateShop } from "@/db/index";

const handler = nc();

const storage = multer.memoryStorage();

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported file type!"), false);
    }
  },
});

cloudinary.config({
  cloud_name: "dw6xhvlph",
  api_key: "363923182319938",
  api_secret: "JLIo4SQKqotSpWLeO8y4CXke-Es",
});

handler.use(all);

handler.patch(upload.single("storeProfile"), async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }
  let storeProfile;
  if (req.file) {
    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: "fill",
    });
    storeProfile = image.secure_url;
  }

  const { shopId } = req.body;

  const data = await updateShop(req.db, { _id: shopId, storeProfile });
  res.json({ data });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
