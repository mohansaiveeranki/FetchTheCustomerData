
function TableCommonCard({ customers = [], onViewDetails }) {
  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Gender</th>
              <th>Role & Company</th>
              <th>Department</th>
              <th>Contact Details</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const isMale = c.gender?.toLowerCase() === "male";
              return (
                <tr key={c.id}>
                  {/* Profile Cell (Avatar, Name, Username) */}
                  <td>
                    <div className="table-profile-cell">
                      <img 
                        src={c.image || `https://robohash.org/${c.id}?set=set5`} 
                        alt={`${c.firstName} ${c.lastName}`} 
                        className="table-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${c.firstName}`;
                        }}
                      />
                      <div>
                        <div className="table-name">{c.firstName} {c.lastName}</div>
                        <div className="table-username">@{c.username || `user_${c.id}`}</div>
                      </div>
                    </div>
                  </td>

                  {/* Gender Cell with Badge */}
                  <td>
                    <span className={`table-badge ${isMale ? "male" : "female"}`}>
                      {isMale ? "Male ♂" : "Female ♀"}
                    </span>
                  </td>

                  {/* Role & Company Cell */}
                  <td>
                    <div className="table-company">{c.company?.title || "Customer / Member"}</div>
                    <div className="table-dept" style={{ color: 'var(--text-tertiary)' }}>
                      {c.company?.name || "N/A"}
                    </div>
                  </td>

                  {/* Department Cell */}
                  <td>
                    <span className="table-dept">{c.company?.department || "General"}</span>
                  </td>

                  {/* Contact Details Cell */}
                  <td>
                    <div>{c.email}</div>
                    <div className="table-dept" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {c.phone}
                    </div>
                  </td>

                  {/* Action Cell */}
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button 
                        className="table-action-btn"
                        onClick={() => onViewDetails && onViewDetails(c)}
                        title="View Full Profile"
                        aria-label={`View profile of ${c.firstName}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableCommonCard;
