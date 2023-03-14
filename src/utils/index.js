const fs = require('fs').promises;

const readFile = async (talkers) => {
  try {
    const data = await fs.readFile(talkers, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
      console.error(error.message);
  }
};

module.exports = { readFile };