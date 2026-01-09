export default function Newsletter() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto bg-black text-white px-12 py-16 rounded-3xl flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold mb-2">STAY UPTO DATE ABOUT</h3>
          <h3 className="text-3xl font-bold">OUR LATEST OFFERS</h3>
        </div>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-80 px-4 py-3 rounded-full bg-white text-black focus:outline-none"
          />
          <button className="w-80 bg-white text-black px-4 py-3 rounded-full font-semibold hover:bg-gray-100">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}