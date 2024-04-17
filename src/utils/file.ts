import { MultipartFile } from "../@types/multipart_file.type";
import path from "path";

export const saveImage: (file: MultipartFile) => Promise<string> = async (
  file
) => {
  const extension = file.mimetype.split("/")[1];
  const fileName = file.md5 + "." + extension;
  const filePath = path.resolve(__dirname, `../../static/images/${fileName}`);
  file.mv(filePath);
  return fileName;
};
