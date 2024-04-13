import { FastifyReply, FastifyRequest } from "fastify";
import { GetUuidParam } from "../../common/schemas/uuid_param.schema";
import fs from "fs";
import path from "path";
import { NotFoundError } from "../../utils/exceptions";

export async function downloadFailedExcel(
  request: FastifyRequest<{
    Params: GetUuidParam;
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = request.params;
    const filePath = path.resolve(
      __dirname,
      "../../../static/failed_excel",
      id
    );
    const fileStream = fs.createReadStream(filePath);
    return reply
      .header("Content-Disposition", 'attachment; filename="' + id + '"')
      .send(fileStream)
      .then(
        () => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        },
        () => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      );
  } catch (error) {
    throw new NotFoundError("File not found");
  }
}
