import React, { useState } from "react";
import { useCustomerhook } from "../customhooks/useCustomerhook";
import TableCommonCard from "./TableCommonCard";
import SearchCommomComponent from "./SearchCommomComponent";

const CustomerCard = () => {
  const { loading, data, error } = useCustomerhook();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredCustomers = data.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const email = c.email.toLowerCase();
    const searchValue = search.toLowerCase();
    return fullName.includes(searchValue) || email.includes(searchValue);
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    const roleA = (a.role || "").toLowerCase();
    const roleB = (b.role || "").toLowerCase();

    switch (sortOption) {
      case "name-asc":
        return nameA.localeCompare(nameB);
      case "name-desc":
        return nameB.localeCompare(nameA);
      case "role-asc":
        return a.role.localeCompare(b.role);
      case "role-desc":
        return b.role.localeCompare(a.role);
      default:
        return b.id - a.id;
    }
  });

  return (
    <div>
      <h1>Customer Component</h1>
      <SearchCommomComponent search={search} setSearch={setSearch} />
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name-asc">Name Ascending</option>
          <option value="name-desc">Name Descending</option>
          <option value="role-asc">Role Ascending</option>
          <option value="role-desc">Role Descending</option>
        </select>
      </div>

      <TableCommonCard customers={sortedCustomers} />
    </div>
  );
};

export default CustomerCard;
