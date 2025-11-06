import "../Asserts/Table.css";

export default function Table({ data, handleEdit }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Created At</th>
          <th>Description</th>
          <th>Active</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.stock}</td>
            <td>{new Date(p.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            <td>{p.description}</td>
            <td>{p.isActive ? "Active" : "Inactive"}</td>
            <td>
              {p.tags.join(", ")}
            </td>
            <td><button id="table_edit" onClick={(e) => {
              handleEdit({e : e, p: p});
            }}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}