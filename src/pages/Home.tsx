import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useRandomDog, useAllBreeds } from '../hooks/useDogApi';
import { BreedCard } from '../components/BreedCard';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const { image, loading: imageLoading } = useRandomDog();
  const { breeds, loading: breedsLoading } = useAllBreeds();

  // Get 6 random breeds for featured section
  const featuredBreeds = breeds.length > 0 
    ? [...breeds].sort(() => 0.5 - Math.random()).slice(0, 6)
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DogBreedExplorer",
    "url": "https://your-domain.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://your-domain.com/breeds?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": featuredBreeds.map((b, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": b.subBreed ? `${b.subBreed} ${b.breed}` : b.breed,
      "url": `https://your-domain.com/breed/${b.subBreed ? `${b.breed}-${b.subBreed}` : b.breed}`
    }))
  };

  return (
    <>
      <SEO 
        title="Discover Dog Breeds" 
        description="Explore hundreds of dog breeds with high-quality images and detailed information. Find your perfect furry companion today."
        schema={schema}
      />
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
      
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Discover Your Perfect <span className="text-blue-600">Dog Breed</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg">
              Explore our comprehensive database of dog breeds. View high-quality images and learn about different types of dogs from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/breeds" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Browse All Breeds
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
            {imageLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <img 
                src={image} 
                alt="A beautiful random dog" 
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </section>

      {/* Featured Breeds */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Featured Breeds</h2>
              <p className="text-slate-600">Discover some of our favorite dog breeds.</p>
            </div>
            <Link to="/breeds" className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {breedsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden animate-pulse">
                  <div className="aspect-square bg-slate-200"></div>
                  <div className="p-4"><div className="h-6 bg-slate-200 rounded w-1/2"></div></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBreeds.map((breedObj, idx) => (
                <BreedCard 
                  key={`${breedObj.breed}-${breedObj.subBreed || ''}-${idx}`} 
                  breed={breedObj.breed} 
                  subBreed={breedObj.subBreed} 
                />
              ))}
            </div>
          )}
          
          <div className="mt-10 sm:hidden flex justify-center">
            <Link to="/breeds" className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 font-medium hover:bg-slate-50 transition-colors">
              View all breeds
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Why Use DogBreedExplorer?</h2>
            <p className="text-slate-600 mb-4">
              DogBreedExplorer is your ultimate resource for discovering and learning about different dog breeds. Powered by the extensive Dog CEO API, we provide access to thousands of high-quality images across hundreds of recognized breeds and sub-breeds.
            </p>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Comprehensive Breed Database</h3>
            <p className="text-slate-600 mb-4">
              Whether you're looking for a popular breed like the Golden Retriever or a rare hound, our database is constantly updated. Each breed profile features a curated gallery of images to help you identify and appreciate the unique characteristics of every dog.
            </p>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Fast and Mobile-Friendly</h3>
            <p className="text-slate-600 mb-4">
              Our platform is built with modern web technologies ensuring lightning-fast load times and a seamless experience across all devices. Browse dog breeds on your phone, tablet, or desktop with ease.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
