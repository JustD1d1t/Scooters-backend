import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || "mongodb://localhost:27017/test",
  jwt: process.env.JWT_SECRET || "gdfsg/#$?%#:#%$32532",
};
