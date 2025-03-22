import React from "react";
import Table from "../components/GTable/Table";

const columns = [
  { header: "ID", key: "id" },
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  { header: "Role", key: "role" }
];

const rows = [
  { id: 1, email: "john@example.com", name: "John Doe", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor" }
];
const token = localStorage.getItem("user");
const Test = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">User Table {token}</h1>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default Test;
