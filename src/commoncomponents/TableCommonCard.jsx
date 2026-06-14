import React from "react";

function TableCommonCard({ customers }) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id}>
            <td>
              {c.firstName} {c.lastName}
            </td>
            <td>{c.company?.title}</td>
            <td>{c.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCommonCard;
