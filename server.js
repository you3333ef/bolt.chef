const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Chef + Bolt.diy API Gateway',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/unified/applications', (req, res) => {
  const { prompt } = req.body;
  res.json({
    success: true,
    message: `Generated application from prompt: ${prompt}`,
    chefInfra: 'Provisioned',
    boltApp: 'Deployed'
  });
});

app.listen(PORT, () => {
  console.log(`Chef + Bolt.diy API Gateway running on port ${PORT}`);
});
