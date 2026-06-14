
const GridCommonCard = ({ customers = [], onViewDetails }) => {
  return (
    <div className="grid-container">
      {customers.map((c) => {
        const isMale = c.gender?.toLowerCase() === "male";
        return (
          <div key={c.id} className="customer-card-item">
            {/* Avatar & Gender Badge */}
            <div className="card-avatar-wrapper">
              <img 
                src={c.image || `https://robohash.org/${c.id}?set=set5`} 
                alt={`${c.firstName} ${c.lastName}`} 
                className="card-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${c.firstName}`;
                }}
              />
              <span className={`gender-badge ${isMale ? "male" : "female"}`}>
                {isMale ? "♂" : "♀"}
              </span>
            </div>

            {/* Customer Basic Info */}
            <h3 className="card-name">{c.firstName} {c.lastName}</h3>
            <span className="card-username">@{c.username || `user_${c.id}`}</span>
            
            <span className="card-role-badge" title={c.company?.title || "No Title Specified"}>
              {c.company?.title || "Customer / Member"}
            </span>

            {/* Customer Quick Details */}
            <div className="card-details-list">
              <div className="card-detail-item" title={c.email}>
                <span className="card-detail-icon">✉</span>
                <span>{c.email}</span>
              </div>
              <div className="card-detail-item" title={c.phone}>
                <span className="card-detail-icon">☎</span>
                <span>{c.phone}</span>
              </div>
              <div className="card-detail-item" title={c.company?.department || "No Department"}>
                <span className="card-detail-icon">🏢</span>
                <span>{c.company?.department || "General"}</span>
              </div>
            </div>

            {/* Profile Action Trigger */}
            <button 
              className="card-action-btn"
              onClick={() => onViewDetails && onViewDetails(c)}
            >
              <span>View Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GridCommonCard;
