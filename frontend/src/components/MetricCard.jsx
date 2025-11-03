import React from 'react';

export default function MetricCard({ metric }) {
  const getStatusClass = (value) => {
    if (value < 70) return 'success';
    if (value < 85) return 'warning';
    return 'danger';
  };

  const getStatusBadge = (value) => {
    if (value < 70) return { text: 'Healthy', class: 'bg-success' };
    if (value < 85) return { text: 'Warning', class: 'bg-warning text-dark' };
    return { text: 'Critical', class: 'bg-danger' };
  };

  const cpuStatus = getStatusClass(metric.cpu_usage);
  const memStatus = getStatusClass(metric.memory_usage);
  const diskStatus = getStatusClass(metric.disk_usage);
  const overallStatus = getStatusBadge(Math.max(metric.cpu_usage, metric.memory_usage, metric.disk_usage));

  return (
    <div className="card metric-card shadow-sm h-100">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-pc-display me-2"></i>
          {metric.hostname}
        </h5>
        <span className={`badge ${overallStatus.class}`}>
          {overallStatus.text}
        </span>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span>CPU Usage</span>
            <strong>{metric.cpu_usage.toFixed(1)}%</strong>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div
              className={`progress-bar bg-${cpuStatus}`}
              role="progressbar"
              style={{ width: `${metric.cpu_usage}%` }}
              aria-valuenow={metric.cpu_usage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span>Memory Usage</span>
            <strong>{metric.memory_usage.toFixed(1)}%</strong>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div
              className={`progress-bar bg-${memStatus}`}
              role="progressbar"
              style={{ width: `${metric.memory_usage}%` }}
              aria-valuenow={metric.memory_usage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <div className="mb-2">
          <div className="d-flex justify-content-between mb-1">
            <span>Disk Usage</span>
            <strong>{metric.disk_usage.toFixed(1)}%</strong>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div
              className={`progress-bar bg-${diskStatus}`}
              role="progressbar"
              style={{ width: `${metric.disk_usage}%` }}
              aria-valuenow={metric.disk_usage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
        <small>
          <i className="bi bi-clock me-1"></i>
          Last updated: {new Date(metric.timestamp).toLocaleString()}
        </small>
      </div>
    </div>
  );
}
