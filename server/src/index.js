import express from 'express';
import cors from 'cors';
import creatorRoutes from './routes/creators.js';
import campaignRoutes from './routes/campaigns.js';
import escrowRoutes from './routes/escrow.js';
import scannerRoutes from './routes/scanner.js';
import aiRoutes from './routes/ai.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health & Status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'CamFlow API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/creators', creatorRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/scanner', scannerRoutes);
app.use('/api/ai', aiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[CamFlow Error]', err);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`✨ CamFlow Server running at http://localhost:${PORT}`);
});
