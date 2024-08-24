import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, "..", ".env")});


const apiBaseUrl = process.env.API_URL || "http://localhost:3000"; 


const readJsonFile = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
};

const addSecurity = async (security) => {
  const response = await fetch(`${apiBaseUrl}/api/securities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ticker: security.ticker,
      securityName: security.securityName,
      sector: security.sector,
      country: security.country,
      trend: security.trend
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to add security: ${security.ticker}`);
  }

  return response.json();
};

const addPrices = async (securityId, prices) => {
  const pricePromises = fetch(`${apiBaseUrl}/api/securities/${securityId}/prices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prices)
  })

  return await Promise.all(pricePromises);

};

const processSecurities = async (filePath) => {
  try {
    const securities = await readJsonFile(filePath);

    for (const security of securities) {
      try {
        const createdSecurity = await addSecurity(security);
        await addPrices(createdSecurity.id, security.prices);
        console.log(`Successfully added security ${security.ticker} and its prices.`);
      } catch (error) {
        console.error(error.message);
      }
    }
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
  }
};


const filePath = path.join(__dirname, 'data.json');
processSecurities(filePath);