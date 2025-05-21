import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/features/authSlice";

const Dashboard = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector(selectCurrentUser);

  const totalProducts = products?.length || 0;
  const lowStockProducts = products?.filter((p) => p.stock < 10).length || 0;
  const outOfStockProducts = products?.filter((p) => p.stock === 0).length || 0;

  return (
    <div className="p-6 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your commodities
        </p>
      </div>
    
      <h1 className="text-xl mb-5 font-semibold text-gray-900 dark:text-white">
        Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
   
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-indigo-600">{totalProducts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Low Stock Products
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {lowStockProducts}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Out of Stock
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {outOfStockProducts}
          </p>
        </div>
      </div>

      <div className="mt-8 ">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow md:overflow-hidden overflow-x-scroll">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products?.slice(0, 5).map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock === 0
                          ? "bg-red-100 text-red-800"
                          : product.stock < 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock < 10
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
