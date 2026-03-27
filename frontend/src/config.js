const API_BASE = process.env.NODE_ENV === 'production' 
  ? '' // In production, frontend is served by backend (relative URL)
  : 'http://localhost:5000'; // In dev, we use separate port

export default API_BASE;