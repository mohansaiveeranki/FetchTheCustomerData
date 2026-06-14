import { useState, useMemo, useEffect } from "react";
import { useCustomerhook } from "../customhooks/useCustomerhook";
import TableCommonCard from "./TableCommonCard";
import GridCommonCard from "./GridCommonCard";
import SearchCommomComponent from "./SearchCommomComponent";
import CustomerDetailModal from "./CustomerDetailModal";
import StatsDashboard from "./StatsDashboard";

const CustomerCard = () => {
  const { loading, data = [], error } = useCustomerhook();
  
  // Filtering, Sorting and View States
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name-asc");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Standard items per page

  // Modal State
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Theme State (Default to Dark Mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("crm-theme") || "dark";
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("crm-theme", theme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Extract unique departments for the dropdown list
  const departments = useMemo(() => {
    const depts = new Set();
    data.forEach((c) => {
      if (c.company?.department) {
        depts.add(c.company.department);
      }
    });
    return Array.from(depts).sort();
  }, [data]);

  // Filter Customers
  const filteredCustomers = useMemo(() => {
    return data.filter((c) => {
      // 1. Search Query Filter
      const fullName = `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase();
      const email = (c.email || "").toLowerCase();
      const title = (c.company?.title || "").toLowerCase();
      const searchValue = search.toLowerCase();
      const matchesSearch = 
        fullName.includes(searchValue) || 
        email.includes(searchValue) || 
        title.includes(searchValue);

      // 2. Gender Filter
      const matchesGender = 
        genderFilter === "all" || 
        c.gender?.toLowerCase() === genderFilter.toLowerCase();

      // 3. Department Filter
      const matchesDept = 
        deptFilter === "all" || 
        c.company?.department === deptFilter;

      return matchesSearch && matchesGender && matchesDept;
    });
  }, [data, search, genderFilter, deptFilter]);

  // Sort Customers
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
      const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();

      switch (sortOption) {
        case "name-asc":
          return nameA.localeCompare(nameB);
        case "name-desc":
          return nameB.localeCompare(nameA);
        case "age-asc":
          return (a.age || 0) - (b.age || 0);
        case "age-desc":
          return (b.age || 0) - (a.age || 0);
        case "id-asc":
        default:
          return (a.id || 0) - (b.id || 0);
      }
    });
  }, [filteredCustomers, sortOption]);

  // Handlers to update filters and reset pagination page to 1
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };
  const handleGenderChange = (val) => {
    setGenderFilter(val);
    setCurrentPage(1);
  };
  const handleDeptChange = (val) => {
    setDeptFilter(val);
    setCurrentPage(1);
  };
  const handleSortChange = (val) => {
    setSortOption(val);
    setCurrentPage(1);
  };

  // Pagination bounds calculation
  const totalCustomers = sortedCustomers.length;
  const totalPages = Math.ceil(totalCustomers / pageSize) || 1;
  
  const paginatedCustomers = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return sortedCustomers.slice(startIdx, startIdx + pageSize);
  }, [sortedCustomers, currentPage, pageSize]);

  // Page range numbers calculation
  const paginationRange = useMemo(() => {
    const range = [];
    const maxPageButtons = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="dashboard-layout">
      <div className="main-content">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Customer Database Portal</h1>
            <p>Monitor, search, and manage directories of registered client profiles</p>
          </div>
          <div className="header-right">
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle visual theme"
            >
              {theme === "dark" ? (
                // Sun Icon for Light Mode Option
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                // Moon Icon for Dark Mode Option
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Stats Panel */}
        {!loading && !error && data.length > 0 && (
          <StatsDashboard customers={data} />
        )}

        {/* Search & Filter Toolbar */}
        <SearchCommomComponent
          search={search}
          setSearch={handleSearchChange}
          genderFilter={genderFilter}
          setGenderFilter={handleGenderChange}
          deptFilter={deptFilter}
          setDeptFilter={handleDeptChange}
          sortOption={sortOption}
          setSortOption={handleSortChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
          departments={departments}
        />

        {/* Core State Rendering: Loading, Error, Empty, or Data Views */}
        {loading ? (
          <div className="loader-wrapper">
            <span className="loader-spinner"></span>
            <span className="loader-text">Fetching customer directories...</span>
          </div>
        ) : error ? (
          <div className="no-data-wrapper" style={{ borderColor: 'var(--danger)' }}>
            <span className="no-data-icon" style={{ color: 'var(--danger)' }}>⚠️</span>
            <h2 className="no-data-title">Failed to Load Customers</h2>
            <p className="no-data-desc">{error}</p>
          </div>
        ) : totalCustomers === 0 ? (
          <div className="no-data-wrapper">
            <span className="no-data-icon">🔍</span>
            <h2 className="no-data-title">No Customers Found</h2>
            <p className="no-data-desc">We couldn't find any profiles matching your current search criteria.</p>
          </div>
        ) : (
          <>
            {/* View Mode Switching */}
            {viewMode === "grid" ? (
              <GridCommonCard 
                customers={paginatedCustomers} 
                onViewDetails={setSelectedCustomer} 
              />
            ) : (
              <TableCommonCard 
                customers={paginatedCustomers} 
                onViewDetails={setSelectedCustomer} 
              />
            )}

            {/* Pagination Controls */}
            <footer className="pagination-wrapper">
              <div className="pagination-info">
                Showing <span>{Math.min(totalCustomers, (currentPage - 1) * pageSize + 1)}</span> to{" "}
                <span>{Math.min(totalCustomers, currentPage * pageSize)}</span> of{" "}
                <span>{totalCustomers}</span> customers
              </div>
              <div className="pagination-controls">
                {/* Previous Button */}
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                >
                  &lt;
                </button>

                {/* Page Numbers */}
                {paginationRange.map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                >
                  &gt;
                </button>
              </div>
            </footer>
          </>
        )}

        {/* Customer Detail Drawer Modal overlay */}
        {selectedCustomer && (
          <CustomerDetailModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
