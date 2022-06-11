import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  database:
    process.env.DATABASE ||
    "mongodb+srv://Dawid:Test123@cluster0.20x8cah.mongodb.net/test",
  jwt: process.env.JWT_SECRET || "gdfsg/#$?%#:#%$32532",
  priceURL: "https://api.binance.com/api/v3/ticker/price?symbol=",
};
