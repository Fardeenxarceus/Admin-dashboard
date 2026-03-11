import { Link } from "react-router-dom";

function RecentOrders({ orders }) {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Orders</h2>

        <Link to="/orders" className="btn btn-sm btn-outline btn-primary">
          View All 
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-sm">
            <tr className="text-center">
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Info</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover text-center">
                {/* Order ID */}
                <td className="font-mono text-xs">#{order.id}</td>

                {/* Customer */}
                <td className="font-medium">{order.customerName}</td>

                {/* Product */}
                <td>
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-12 h-12 object-contain rounded-md bg-base-200 p-1"
                    />

                    <span className="text-xs font-medium line-clamp-1">
                      {order.productName}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td>₹ {order.price}</td>

                {/* Qty */}
                <td>{order.qty}</td>

                {/* Status */}
                <td>
                  <span
                    className={`badge badge-sm ${
                      order.status === "Completed"
                        ? "badge-success"
                        : order.status === "Pending"
                          ? "badge-warning"
                          : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Info */}
                <td className="align-middle">
                  <div className="text-xs text-gray-500 max-w-45 mx-auto line-clamp-2 lg:line-clamp-3">
                    {order.info}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-base-200 rounded-lg p-4 flex gap-4 items-center"
          >
            <img
              src={order.image}
              alt={order.productName}
              className="w-16 h-16 object-contain bg-base-100 rounded-md p-2"
            />

            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm">{order.productName}</h3>

                <span
                  className={`badge badge-xs ${
                    order.status === "Completed"
                      ? "badge-success"
                      : order.status === "Pending"
                        ? "badge-warning"
                        : "badge-error"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-gray-500">{order.customerName}</p>
              <p className="text-xs">
                ₹ {order.price} × {order.qty}
              </p>

              <p className="text-xs text-gray-500 line-clamp-2">{order.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;
