import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <i className="bi bi-pc-display-horizontal me-2"></i>
          SysTrack - System Health Monitoring
        </span>
        <span className="navbar-text">
          <small className="text-muted">Real-time Dashboard</small>
        </span>
      </div>
    </nav>
  );
}
