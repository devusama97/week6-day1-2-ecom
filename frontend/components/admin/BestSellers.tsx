interface BestSellersProps {
  products: Array<{
    name: string;
    price: number;
    originalPrice: number;
    sales: number;
  }>;
}

export default function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">Best Sellers</h3>
        <button className="text-gray-400">⋯</button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base truncate">{product.name}</h4>
              <p className="text-xs sm:text-sm text-gray-500">₹{product.originalPrice}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-sm sm:text-base">₹{product.price}</p>
              <p className="text-xs sm:text-sm text-gray-500">{product.sales} sales</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 sm:mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm sm:text-base">
        REPORT
      </button>
    </div>
  );
}