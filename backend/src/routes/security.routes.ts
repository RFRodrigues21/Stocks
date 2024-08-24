import { Router } from 'express';
import { Security } from '../models/security.model';
import { Price } from '../models/price.model';

const router = Router();

// Get all securities
router.get('/securities', async (req, res) => {
  try {
    const isSimple = req.query.simple === 'true';

    if (isSimple) {
      // If 'simple' is true, return only selected fields
      const securities = await Security.findAll({
        attributes: ['id', 'ticker', 'securityName', 'sector', 'country', 'trend']
      });
      res.json(securities);
    } else {
      // Otherwise, include all fields with related prices
      const securities = await Security.findAll({ include: [Price] });
      res.json(securities);
    }

  } catch (error) {
    res.status(500).json({ error: "" });
  }
});

// Create a security
router.post('/securities', async (req, res) => {
    const { ticker, securityName, sector, country, trend } = req.body;
  
    try {
      // Validate required fields
      if (!ticker || !securityName || !sector || !country || trend === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Create a new security
      const security = await Security.create({
        ticker,
        securityName,
        sector,
        country,
        trend,
      });
  
      // Return the created security
      res.status(201).json(security);
    } catch (error) {
      console.error('Error creating security:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to insert a price for a security
router.post('/securities/:securityId/prices', async (req, res) => {
    const { securityId } = req.params;
    const prices = req.body; // Expecting an array of price objects
  
    try {
      // Validate that the request body is an array
      if (!Array.isArray(prices)) {
        return res.status(400).json({ error: 'Prices should be an array' });
      }
  
      // Validate each price entry
      for (const price of prices) {
        const { date, close, volume } = price;
        if (!date || !close || !volume) {
          return res.status(400).json({ error: 'Date, close, and volume are required for each price entry' });
        }
      }
  
      // Check if the security exists
      const security = await Security.findByPk(securityId);
      if (!security) {
        return res.status(404).json({ error: 'Security not found' });
      }
  
      // Create new price records
      const newPrices = await Promise.all(prices.map(price => 
        Price.create({
          securityId: Number(securityId),
          date: price.date,
          close: price.close,
          volume: price.volume,
        })
      ));
  
      // Return the created price records
      res.status(201).json(newPrices);
    } catch (error) {
      console.error('Error creating prices:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get a specific security by ID
router.get('/securities/:id', async (req, res) => {
  try {
    const security = await Security.findByPk(req.params.id, { include: [Price] });
    if (security) {
      res.json(security);
    } else {
      res.status(404).json({ message: 'Security not found' });
    }
  } catch (error) {
    res.status(500).json({ error: "" });
  }
});

export default router;
