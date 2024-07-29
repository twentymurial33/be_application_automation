const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const { extractKeywords } = require("./keywordExtractor");
const { saveToDatabase } = require("./database");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const resumeBuffer = req.file.buffer;
    const extractedKeywords = extractKeywords(resumeBuffer);
    await saveToDatabase(extractedKeywords);
    res.json({
      message: "File uploaded and processed",
      keywords: extractedKeywords,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
