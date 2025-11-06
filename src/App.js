import React, { useState, useEffect, useRef } from "react";
import "./Asserts/App.css";
import Table from "./components/Table";
import CardStyle from "./components/CardStyle";
import Model from "./components/Model";
const pageSize = 10;

const App = () => {
  const [view, setView] = useState("list");
  const [products, setProducts] = useState([]); 
  const [filtered, setFiltered] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [form, setForm] = useState({ id: null, name: "", price: "", category: "", stock: "", description: "", tags: [], createdAt: "" });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);

  //dialog ref
  const dialogRef = useRef('');

  const openDialog = (payload) => {
    console.log("Payload:", payload.target.id);
    if(payload.target.id === "add_product"){
      console.log("Add button clicked");
      setForm({ id: null, name: "", price: "", category: "", stock: "", description: "", tags: [], createdAt: "" });
      dialogRef.current.showModal();
      return
    }
    dialogRef.current.showModal();
  };
  const closeDialog = () => dialogRef.current.close();

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Fetch initial data
  useEffect(() => {
    const data = require("./products_data/products.json"); 
    setProducts(data);
    setFiltered(data);
  }, []);

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required.";
    if (!form.price || isNaN(form.price)) errs.price = "Valid number required.";
    if (!form.category) errs.category = "Category is required.";
    if (!form.stock || isNaN(form.stock)) errs.stock = "Valid number required.";
    if (!form.createdAt) errs.createdAt = "Creation date is required.";
    if (!form.tags || !form.tags.length) errs.tags = "At least one tag is required.";
    return errs;
  };

  // Submit form (Add / Edit)
  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    console.log("Form submitted:", form);
    console.log(form.id)
    if (form.id) {
      setProducts(prev =>
        prev.map(p =>
          p.id === form.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p
        )
      );
    } else {
      const newProduct = { ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock) };
      setProducts(prev => [...prev, newProduct]);
    }
    setForm({ id: null, name: "", price: "", category: "", stock: "", description: "", tags: [], createdAt: "" });
    setErrors({});
  };

  const handleEdit = ({e, p}) => {
    setForm(p)
    console.log("Editing product:", p);
    console.log(e);
    openDialog(e);
  };

  

  // Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      let filteredList = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setFiltered(filteredList);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search, products]);

  return (
    <div className="container">
      <h2>Product Management</h2>
      <div className="search-bar">
        <label htmlFor="searchBar">Search by product name </label>
        <input 
          id="searchBar" 
          list="filterList" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search by name..." 
        />
        <datalist id="filterList" >
          {
            products.map(p => (<option key={p.id} value={p.name} />))
          }
        </datalist>
      </div>
      <hr />

      {/* dialog  */}
      <div className="model-div">
        <span> List your Products </span>
        <Model 
          form={form} 
          setForm={setForm} 
          dialogRef={dialogRef} 
          openDialog={openDialog} 
          closeDialog={closeDialog} 
          errors={errors} 
          handleSubmit={handleSubmit} 
        />
      </div>

      <div class="bar">
        <button 
          class={view === "list" ? "active" : ''} onClick={() => setView("list")} >List View</button>
        <button class={view === "grid" ? "active" : ''} onClick={() => setView("grid")}>Card View</button>
      </div>

      {view === "list" ? 
        (
          <Table 
            data={paginated} 
            handleEdit={handleEdit} 
          />
        ) 
        : 
        (
          <CardStyle 
            data={paginated} 
            handleEdit={handleEdit} 
          />
        )
      }

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;
