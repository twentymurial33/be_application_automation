const natural = require("natural");

const extractKeywords = (resumeBuffer) => {
  const resumeText = resumeBuffer.toString("utf-8");
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(resumeText);
  const keywords = words.filter((word) => word.length > 4);
  return keywords;
};

module.exports = { extractKeywords };
