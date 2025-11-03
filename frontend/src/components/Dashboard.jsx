import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import MetricsTable from "./MetricsTable";
import { getLatestMetrics, getAllMetrics } from "../services/api";

export default function Dashboard() {
  const [latestMetrics, setLatestMetrics] = useState([]);
  const [allMetrics, setAllMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [latest, all] = await Promise.all([
        getLatestMetrics(),
        getAllMetrics(50)
      ]);
      setLatestMetrics(latest);
      setAllMetrics(all);
      setError(null);
    } catch (err) {
      setError("Failed to fetch metrics. Make sure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading && latestMetrics.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Connection Error</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please ensure the backend server is running on http://localhost:8000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-3">System Health Overview</h2>
          <p className="text-muted">
            Monitoring {latestMetrics.length} active system{latestMetrics.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={fetchData}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Latest Metrics Cards */}
      <div className="row mb-4">
        {latestMetrics.map((metric, index) => (
          <div className="col-md-6 col-lg-4 mb-3" key={index}>
            <MetricCard metric={metric} />
          </div>
        ))}
      </div>

      {latestMetrics.length === 0 && (
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Data Available</h5>
          <p>No metrics have been collected yet. Please start the agent to begin monitoring.</p>
          <hr />
          <p className="mb-0">Run: <code>python agent/system_agent.py</code></p>
        </div>
      )}

      {/* Historical Metrics Table */}
      {allMetrics.length > 0 && (
        <div className="row">
          <div className="col-12">
            <h3 className="mb-3">Recent Metrics History</h3>
            <MetricsTable metrics={allMetrics} />
          </div>
        </div>
      )}
    </div>
  );
}
