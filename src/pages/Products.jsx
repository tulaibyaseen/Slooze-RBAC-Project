import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../app/features/productsSlice";
import { FiEdit2, FiTrash2, } from "react-icons/fi";


const initialForm = { name: "", category: "", stock: "", price: "" };

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const openAddModal = () => {
    setEditId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditId(product.id);
    setForm(product);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateProduct({ ...form, id: editId }));
    } else {
      dispatch(
        addProduct({
          ...form,
          stock: Number(form.stock),
          price: Number(form.price),
        })
      );
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={openAddModal}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow md:overflow-hidden overflow-x-scroll sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {p.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {p.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {p.stock}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ${p.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      p.stock === 0
                        ? "bg-red-100 text-red-800"
                        : p.stock < 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {p.stock === 0
                      ? "Out of Stock"
                      : p.stock < 10
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEdit2 className="inline-block" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteProduct(p.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="p-6 fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-96 space-y-4"
          >
            <h2 className="text-xl font-bold mb-2">
              {editId ? "Edit" : "Add"} Product
            </h2>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              type="number"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
