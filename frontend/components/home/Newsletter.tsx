export default function Newsletter() {
  return (
    <section className="px-4 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto bg-black text-white px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">STAY UPTO DATE ABOUT</h3>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">OUR LATEST OFFERS</h3>
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-4 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-80 px-4 py-2 sm:py-3 rounded-full bg-white text-black focus:outline-none text-sm sm:text-base"
          />
          <button className="w-full md:w-80 bg-white text-black px-4 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 text-sm sm:text-base">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}