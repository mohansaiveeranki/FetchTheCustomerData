import { useMemo } from "react";

const StatsDashboard = ({ customers = [] }) => {
  const stats = useMemo(() => {
    if (customers.length === 0) {
      return { total: 0, avgAge: 0, maleCount: 0, femaleCount: 0, malePercent: 0, femalePercent: 0, topDept: "None" };
    }

    const total = customers.length;
    
    // Average Age
    const sumAge = customers.reduce((sum, c) => sum + (c.age || 0), 0);
    const avgAge = Math.round(sumAge / total);

    // Gender breakdown
    const maleCount = customers.filter(c => c.gender?.toLowerCase() === "male").length;
    const femaleCount = customers.filter(c => c.gender?.toLowerCase() === "female").length;
    const malePercent = Math.round((maleCount / total) * 100) || 0;
    const femalePercent = Math.round((femaleCount / total) * 100) || 0;

    // Top Department
    const depts = {};
    customers.forEach(c => {
      const dept = c.company?.department;
      if (dept) {
        depts[dept] = (depts[dept] || 0) + 1;
      }
    });

    let topDept = "N/A";
    let maxCount = 0;
    Object.entries(depts).forEach(([dept, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topDept = dept;
      }
    });

    return {
      total,
      avgAge,
      maleCount,
      femaleCount,
      malePercent,
      femalePercent,
      topDept
    };
  }, [customers]);

  return (
    <div className="stats-grid">
      {/* Stat 1: Total Customers */}
      <div className="stats-card">
        <div className="stats-card-header">
          <span className="stats-card-title">Total Directory Customers</span>
          <div className="stats-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
        <div className="stats-card-value">{stats.total}</div>
        <div className="stats-card-desc">Active customer records fetched</div>
      </div>

      {/* Stat 2: Avg Age */}
      <div className="stats-card">
        <div className="stats-card-header">
          <span className="stats-card-title">Average Age</span>
          <div className="stats-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
        <div className="stats-card-value">{stats.avgAge} yrs</div>
        <div className="stats-card-desc">Average age of listed clients</div>
      </div>

      {/* Stat 3: Gender Distribution */}
      <div className="stats-card">
        <div className="stats-card-header">
          <span className="stats-card-title">Gender Ratio</span>
          <div className="stats-card-icon" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 30v-2c0-2.21-1.79-4-4-4h-1" />
              <circle cx="19" cy="12" r="3" />
            </svg>
          </div>
        </div>
        <div className="stats-card-value" style={{ fontSize: '1.4rem', marginBottom: '0.25rem', marginTop: '0.1rem' }}>
          M: {stats.malePercent}% | F: {stats.femalePercent}%
        </div>
        <div className="ratio-container">
          <div className="ratio-bar-wrapper">
            <div className="ratio-bar-male" style={{ width: `${stats.malePercent}%` }} />
            <div className="ratio-bar-female" style={{ width: `${stats.femalePercent}%` }} />
          </div>
          <div className="ratio-legend">
            <span>{stats.maleCount} Male</span>
            <span>{stats.femaleCount} Female</span>
          </div>
        </div>
      </div>

      {/* Stat 4: Top Department */}
      <div className="stats-card">
        <div className="stats-card-header">
          <span className="stats-card-title">Top Department</span>
          <div className="stats-card-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
        </div>
        <div className="stats-card-value" style={{ fontSize: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={stats.topDept}>
          {stats.topDept}
        </div>
        <div className="stats-card-desc">Most populated business sector</div>
      </div>
    </div>
  );
};

export default StatsDashboard;
