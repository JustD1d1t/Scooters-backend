import { app } from "./app.js";
import { config } from "./config.js";

app
  .listen(config.port, () => {
    console.log(`Serwer uruchomiony na porcie ${config.port}`);
  })
  .on("error", (e) => {
    console.log("Error: " + e);
  });
