import React from 'react';

export default function MetricsTable({ metrics }) {
  const getBadgeClass = (value) => {
    if (value < 70) return 'bg-success';
    if (value < 85) return 'bg-warning text-dark';
    return 'bg-danger';
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>Hostname</th>
                <th>CPU %</th>
                <th>Memory %</th>
                <th>Disk %</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={i}>
                  <td>
                    <strong>{m.hostname}</strong>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(m.cpu_usage)}`}>
                      {m.cpu_usage.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(m.memory_usage)}`}>
                      {m.memory_usage.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(m.disk_usage)}`}>
                      {m.disk_usage.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    <small className="text-muted">
                      {new Date(m.timestamp).toLocaleString()}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
