const fs = require('fs').promises;

const readFile = async (talkers) => {
  try {
    const data = await fs.readFile(talkers, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
      console.error(error.message);
  }
};

const writeFile = async (talkers, data) => {
  try {
    await fs.writeFile(talkers, JSON.stringify(data, null, 2));
} catch (error) {
    console.error(error);
  }
};

module.exports = { readFile, writeFile };