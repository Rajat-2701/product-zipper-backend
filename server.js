const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("./_helpers/db");
const app = express();
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
// defining the routes to redirect:
app.use("/api/users", router);
app.use("/api/products", router);
const port = 8000;

app.listen(port, console.log("port is running on", port));
