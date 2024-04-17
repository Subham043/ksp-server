import { MultipartFile } from "@fastify/multipart";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const saveImage: (file: MultipartFile) => Promise<string> = async (
  file
) => {
  const fileName = uuidv4() + "." + file.mimetype;
  const buffer = await file.toBuffer();
  fs.writeFileSync(`../../static/images/${fileName}`, buffer);
  return fileName;
};
