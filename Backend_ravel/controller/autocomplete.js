import axios from 'axios';
import { validationResult } from 'express-validator';

export const autocomplete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`);

    const suggestions = response.data.features.map(feature => ({
      name: feature.properties.name,
      // city: feature.properties.city || '',
      country: feature.properties.country || '',
      // type: feature.properties.type || ''
    }));

    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
