import "../Asserts/Model.css";
export default function Model({ form, setForm, dialogRef, openDialog, closeDialog, errors, handleSubmit }) {

    return (
        <div>
            <button id="add_product" onClick={openDialog}>Add Products</button>
            <dialog ref={dialogRef}>
                <button onClick={closeDialog} >X</button>
                <form className="product-form" onSubmit={(e) => {
                    const isValid = handleSubmit(e);
                    if (isValid) {
                    console.log("Submitted successfully");
                    closeDialog();
                    } else {
                    console.log("Validation failed, dialog remains open");
                    }
                }}>
                    <label htmlFor="name" >Product Name</label>
                    <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <small>{errors.name}</small>}

                    <label htmlFor="price" >Price Name</label>
                    <input
                        id="price"
                        name="price"
                        placeholder="Price"
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                    />
                    {errors.price && <small>{errors.price}</small>}

                    <label htmlFor="category" >Category Name</label>
                    <input
                        id="category"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                    />
                    {errors.category && <small>{errors.category}</small>}

                    <label htmlFor="stock" >Stock Name</label>
                    <input
                        id="stock"
                        name="stock"
                        placeholder="Stock"
                        type="number"
                        value={form.stock}
                        onChange={e => setForm({ ...form, stock: e.target.value })}
                    />
                    {errors.stock && <small>{errors.stock}</small>}

                    <label htmlFor="description" >Description Name</label>
                    <input
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />

                    <label htmlFor="createdAt" >Created At</label>
                    <input
                        id="createdAt"
                        name="createdAt"
                        placeholder="Created At"
                        type="datetime-local"
                        value={form.createdAt}
                        onChange={e => {
                            setForm({ ...form, createdAt: e.target.value });
                            e.target.blur();
                        }}
                    />
                    {errors.createdAt && <small>{errors.createdAt}</small>}

                    <label htmlFor="tags" >Tags Name</label>
                    <input
                        id="tags"
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={form.tags}
                        onChange={e => setForm({ ...form, tags: e.target.value.split(",").map(tag => tag.trim()) })}
                    />
                    {errors.tags && <small>{errors.tags}</small>}

                    <button type="submit">{form.id ? "Update Product" : "Add Product"}</button>
                    <button onClick={closeDialog}>Close</button>
                </form>
            </dialog>
        </div>
    );
}