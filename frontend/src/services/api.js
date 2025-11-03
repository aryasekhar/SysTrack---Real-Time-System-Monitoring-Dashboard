// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:8000';

export const getLatestMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics/latest`);
  if (!response.ok) {
    throw new Error('Failed to fetch latest metrics');
  }
  return response.json();
};

export const getAllMetrics = async (limit = 100) => {
  const response = await fetch(`${API_BASE_URL}/metrics/?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch all metrics');
  }
  return response.json();
};

export const getMetricsByHostname = async (hostname, limit = 50) => {
  const response = await fetch(`${API_BASE_URL}/metrics/${hostname}?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch metrics for ${hostname}`);
  }
  return response.json();
};

export const submitMetric = async (metricData) => {
  const response = await fetch(`${API_BASE_URL}/metrics/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metricData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit metric');
  }
  return response.json();
};
