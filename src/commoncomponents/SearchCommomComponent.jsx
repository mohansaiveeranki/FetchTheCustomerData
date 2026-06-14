
const SearchCommomComponent = ({
  search,
  setSearch,
  genderFilter,
  setGenderFilter,
  deptFilter,
  setDeptFilter,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  departments = []
}) => {
  return (
    <div className="toolbar-container">
      {/* Primary search and grid/table layout toggles */}
      <div className="toolbar-row">
        <div className="search-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode && setViewMode("grid")}
            title="Grid View"
            aria-label="Switch to Grid View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode && setViewMode("table")}
            title="Table View"
            aria-label="Switch to Table View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Advanced Filter options */}
      <div className="toolbar-row" style={{ marginTop: '0.25rem' }}>
        <div className="filters-group">
          {/* Gender Filter */}
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={genderFilter}
              onChange={(e) => setGenderFilter && setGenderFilter(e.target.value)}
              title="Filter by Gender"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={deptFilter}
              onChange={(e) => setDeptFilter && setDeptFilter(e.target.value)}
              title="Filter by Department"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption && setSortOption(e.target.value)}
              title="Sort Option"
            >
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="age-asc">Age: Youngest First</option>
              <option value="age-desc">Age: Oldest First</option>
              <option value="id-asc">ID: Ascending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCommomComponent;
