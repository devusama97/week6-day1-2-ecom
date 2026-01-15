import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gray-100 px-4 py-8 lg:py-0">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        <div className="flex-1 lg:pr-8 mb-8 lg:mb-0 pt-6 lg:pt-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 lg:mb-6 leading-tight" style={{fontFamily: 'Integral CF, sans-serif'}}>
            FIND CLOTHES<br />
            THAT MATCHES<br />
            YOUR STYLE
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Shop Now
          </button>
          <div className="grid grid-cols-2 sm:flex sm:space-x-8 gap-4 sm:gap-0 mt-8 lg:mt-12">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">200+</div>
              <div className="text-gray-600 text-xs sm:text-base">International Brands</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">2,000+</div>
              <div className="text-gray-600 text-xs sm:text-base">High-Quality Products</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold">30,000+</div>
              <div className="text-gray-600 text-xs sm:text-base">Happy Customers</div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/hero-section.jpg"
            alt="Fashion Models"
            width={400}
            height={200}
            className="w-full h-64 sm:h-96 lg:h-screen object-cover object-top rounded-lg lg:rounded-none"
          />
        </div>
      </div>
    </section>
  );
}