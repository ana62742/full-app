const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const app = express();

const upload = multer({ dest: "backend/uploads/" });
const maxFileSize = 1024 * 700; // 700kb

app.use(cors());
app.use(express.json());

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("File is not specified");
  }

  if (req.file.size > maxFileSize) {
    return res.status(400).send("File is too big");
  }

  if (!req.file.mimetype.includes("text/csv")) {
    return res.status(400).send("Invalid file type");
  }

  const targetLocation = path.join(__dirname, "../backend/uploads");

  try {
    if (!fs.existsSync(targetLocation)) {
      fs.mkdirSync(targetLocation);
    }

    const newPath = path.join(
      targetLocation,
      `${Date.now()}-${req.file.originalname}`
    );
    fs.renameSync(req.file.path, newPath);

    // // Needed for csv created with OpenOffice
    // const csvData = fs
    //   .readFileSync(newPath, { encoding: "utf16le" })
    //   .toString();

    const csvData = fs.readFileSync(newPath).toString();

    const jsonArray = await csv().fromString(csvData);

    return res.status(200).send(jsonArray);
  } catch (err) {
    return res.status(500).send("Invalid file name");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
