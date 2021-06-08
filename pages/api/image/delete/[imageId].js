import nc from "next-connect";
import { all } from "@/middlewares/index";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { updateShop } from "@/db/index";

const handler = nc();

cloudinary.config({
  cloud_name: "dw6xhvlph",
  api_key: "363923182319938",
  api_secret: "JLIo4SQKqotSpWLeO8y4CXke-Es",
});

handler.use(all);

handler.delete(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  const { imageId } = req.query;

  cloudinary.uploader.destroy(
    imageId,
    { resource_type: "image" },
    function (error, result) {
      if (error) {
        console.log("error", error);
      }
      console.log(result);
    }
  );
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
