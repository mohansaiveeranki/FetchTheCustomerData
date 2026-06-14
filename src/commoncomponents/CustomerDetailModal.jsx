import { useEffect } from "react";

const CustomerDetailModal = ({ customer, onClose }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!customer) return null;

  // Mask card number for display
  const getMaskedCardNumber = (cardNumber) => {
    if (!cardNumber) return "N/A";
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (cleaned.length < 4) return cardNumber;
    return `•••• •••• •••• ${cleaned.slice(-4)}`;
  };

  const isMale = customer.gender?.toLowerCase() === "male";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card contents
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header Profile Banner */}
        <div className="modal-header-banner">
          <img
            src={
              customer.image || `https://robohash.org/${customer.id}?set=set5`
            }
            alt={`${customer.firstName} ${customer.lastName}`}
            className="modal-banner-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${customer.firstName}`;
            }}
          />
          <h2 className="modal-banner-name">
            {customer.firstName} {customer.lastName}
          </h2>
          <span className="modal-banner-username">
            @{customer.username || `user_${customer.id}`}
          </span>

          <div className="modal-banner-badges">
            <span className="modal-badge gender">
              {isMale ? "Male ♂" : "Female ♀"}
            </span>
            {customer.company?.title && (
              <span className="modal-badge company-role">
                {customer.company.title}
              </span>
            )}
          </div>
        </div>

        <div className="modal-sections-body">
          <div className="modal-section">
            <h3 className="modal-section-title">Contact & Communication</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Email Address</span>
                <span className="modal-info-value">
                  {customer.email || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Phone Number</span>
                <span className="modal-info-value">
                  {customer.phone || "N/A"}
                </span>
              </div>
              <div className="modal-info-item" style={{ gridColumn: "span 2" }}>
                <span className="modal-info-label">Residential Address</span>
                <span className="modal-info-value">
                  {customer.address?.address
                    ? `${customer.address.address}, ${customer.address.city}, ${customer.address.state} ${customer.address.postalCode}`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Employment & Education</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Company Name</span>
                <span className="modal-info-value">
                  {customer.company?.name || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Department</span>
                <span className="modal-info-value">
                  {customer.company?.department || "N/A"}
                </span>
              </div>
              <div className="modal-info-item" style={{ gridColumn: "span 2" }}>
                <span className="modal-info-label">University / Institute</span>
                <span className="modal-info-value">
                  {customer.university || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Personal Attributes</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Age</span>
                <span className="modal-info-value">
                  {customer.age || "N/A"} Years
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Date of Birth</span>
                <span className="modal-info-value">
                  {customer.birthDate || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Blood Group</span>
                <span className="modal-info-value">
                  {customer.bloodGroup || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Eye Color</span>
                <span
                  className="modal-info-value"
                  style={{ textTransform: "capitalize" }}
                >
                  {customer.eyeColor || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Billing & Security Profile</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Card Brand</span>
                <span
                  className="modal-info-value"
                  style={{ textTransform: "uppercase" }}
                >
                  {customer.bank?.cardType || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Card Number</span>
                <span
                  className="modal-info-value"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {getMaskedCardNumber(customer.bank?.cardNumber)}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Card Expiry</span>
                <span className="modal-info-value">
                  {customer.bank?.cardExpire || "N/A"}
                </span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Preferred Currency</span>
                <span className="modal-info-value">
                  {customer.bank?.currency || "USD"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
