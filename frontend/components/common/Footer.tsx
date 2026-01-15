export default function Footer() {
  return (
    <footer className="bg-gray-100 px-4 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">SHOP.CO</h4>
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="flex space-x-3 sm:space-x-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-full"></div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-full"></div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-full"></div>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">COMPANY</h5>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">HELP</h5>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">FAQ</h5>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">RESOURCES</h5>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-600 text-xs sm:text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-300 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="flex space-x-2 sm:space-x-4">
          <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gray-300 rounded"></div>
          <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gray-300 rounded"></div>
          <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gray-300 rounded"></div>
          <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </footer>
  );
}