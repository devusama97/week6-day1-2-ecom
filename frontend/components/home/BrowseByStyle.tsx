import Image from 'next/image';
import Link from 'next/link';

export default function BrowseByStyle() {
  const styles = [
    { name: 'Casual', image: '/casual-bg.png', slug: 'casual' },
    { name: 'Formal', image: '/formal-bg.png', slug: 'formal' },
    { name: 'Party', image: '/party-bg.png', slug: 'party' },
    { name: 'Gym', image: '/gym-bg.png', slug: 'gym' }
  ];

  return (
    <section className="px-4 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto bg-[#F0F0F0] p-6 sm:p-8 lg:p-12 rounded-3xl">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-8 lg:mb-12" style={{fontFamily: 'Integral CF, sans-serif'}}>BROWSE BY DRESS STYLE</h3>
        
        {/* Mobile: Vertical Stack */}
        <div className="flex flex-col md:hidden space-y-4">
          {styles.map((style) => (
            <Link 
              key={style.slug}
              href={`/category/${style.slug}`}
              className="relative bg-gray-100 rounded-2xl overflow-hidden h-48 block hover:shadow-lg transition-shadow"
            >
              <Image 
                src={style.image} 
                alt={style.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-4 left-4">
                <h4 className="text-xl font-bold">{style.name}</h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Original Layout */}
        <div className="hidden md:block space-y-6">
          {/* First row: 40% and 60% */}
          <div className="flex gap-6">
            <Link 
              href={`/category/${styles[0].slug}`}
              className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 block hover:shadow-lg transition-shadow"
              style={{ width: '40%' }}
            >
              <Image 
                src={styles[0].image} 
                alt={styles[0].name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-6 left-6">
                <h4 className="text-2xl font-bold">{styles[0].name}</h4>
              </div>
            </Link>
            <Link 
              href={`/category/${styles[1].slug}`}
              className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 block hover:shadow-lg transition-shadow"
              style={{ width: '60%' }}
            >
              <Image 
                src={styles[1].image} 
                alt={styles[1].name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-6 left-6">
                <h4 className="text-2xl font-bold">{styles[1].name}</h4>
              </div>
            </Link>
          </div>
          
          {/* Second row: 60% and 40% */}
          <div className="flex gap-6">
            <Link 
              href={`/category/${styles[2].slug}`}
              className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 block hover:shadow-lg transition-shadow"
              style={{ width: '60%' }}
            >
              <Image 
                src={styles[2].image} 
                alt={styles[2].name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-6 left-6">
                <h4 className="text-2xl font-bold">{styles[2].name}</h4>
              </div>
            </Link>
            <Link 
              href={`/category/${styles[3].slug}`}
              className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 block hover:shadow-lg transition-shadow"
              style={{ width: '40%' }}
            >
              <Image 
                src={styles[3].image} 
                alt={styles[3].name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-6 left-6">
                <h4 className="text-2xl font-bold">{styles[3].name}</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}