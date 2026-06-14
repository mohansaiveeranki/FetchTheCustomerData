import React, { useState } from "react";
import { useCustomerhook } from "../customhooks/useCustomerhook";
import TableCommonCard from "./TableCommonCard";
import SearchCommomComponent from "./SearchCommomComponent";

const CustomerCard = () => {
  const { loading, data, error } = useCustomerhook();
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredCustomers = data.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div>
      <h1>Customer Component</h1>
      <TableCommonCard customers={data} />
      <SearchCommomComponent />
    </div>
  );
};

export default CustomerCard;
