interface Order {
  id: string;
  product: string;
  date: string;
  customer: string;
  status: string;
  amount: number;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold">Recent Orders</h3>
            <button className="text-gray-400">⋯</button>
          </div>
        </div>

        <div className="p-8 sm:p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Orders nahi hain</h3>
          <p className="text-sm sm:text-base text-gray-500">Jab customers order place karenge, woh yahan show honge</p>
        </div>

        <div className="p-3 sm:p-4 border-t bg-gray-50 text-center text-xs sm:text-sm text-gray-500">
          © 2023 - pulstron Dashboard
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 sm:p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold">Recent Orders</h3>
          <button className="text-gray-400">⋯</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left hidden sm:table-cell">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Product</th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Order ID</th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 hidden lg:table-cell">Customer Name</th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Status</th>
              <th className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 hidden sm:table-cell">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">{order.product}</td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap">{order.id}</td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell whitespace-nowrap">{order.date}</td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs sm:text-sm">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="text-xs sm:text-sm">{order.customer}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 ${order.status === 'Delivered'
                        ? 'bg-green-500'
                        : order.status === 'Cancelled'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}></span>
                    <span className="hidden sm:inline">{order.status}</span>
                    <span className="sm:hidden">{order.status.substring(0, 3)}</span>
                  </span>
                </td>
                <td className="px-2 sm:px-3 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap">₹{order.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 sm:p-4 border-t bg-gray-50 text-center text-xs sm:text-sm text-gray-500">
        © 2023 - pulstron Dashboard
      </div>
    </div>
  );
}