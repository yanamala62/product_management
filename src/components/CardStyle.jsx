import "../Asserts/CardStyle.css";

export default function CardStyle({ data, handleEdit }) {
  return (
    <div className="product-grid">
      {data.map(p => (
        <div key={p.id} className="card">
          <h4>{p.name}</h4>
          <p>{p.category}</p>
          <p><b>₹{p.price}</b></p>
          <p>{p.stock} in stock</p>
          <button id="card_edit" onClick={(e) => handleEdit({e:e, p:p})}>Edit</button>
        </div>
      ))}
    </div>
  );
}