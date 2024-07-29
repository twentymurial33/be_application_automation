const { extractKeywords } = require("../utils/keywordExtractor");
const { saveToDatabase } = require("../utils/database");

const uploadResume = async (req, res) => {
  try {
    const resumeBuffer = req.file.buffer;
    const extractedKeywords = extractKeywords(resumeBuffer);
    await saveToDatabase(extractedKeywords);

    res.status(200).json({
      message: "File uploaded and processed",
      keywords: extractedKeywords,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};

module.exports = { uploadResume };
