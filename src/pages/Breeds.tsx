import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { useAllBreeds } from '../hooks/useDogApi';
import { BreedCard } from '../components/BreedCard';
import { Search } from 'lucide-react';
import { formatBreedName } from '../utils/helpers';

export function Breeds() {
  const { breeds, loading } = useAllBreeds();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBreeds = useMemo(() => {
    if (!searchTerm) return breeds;
    const lowerSearch = searchTerm.toLowerCase();
    return breeds.filter(b => {
      const fullName = formatBreedName(b.breed, b.subBreed).toLowerCase();
      return fullName.includes(lowerSearch);
    });
  }, [breeds, searchTerm]);

  return (
    <>
      <SEO 
        title="All Dog Breeds A-Z" 
        description="Browse our complete list of dog breeds from A to Z. Filter by name to find your favorite dog breed."
        canonicalUrl="https://your-domain.com/breeds"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Dog Breeds Directory
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Browse through our extensive collection of dog breeds. Use the search bar to find a specific breed quickly.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
              placeholder="Search breeds (e.g., Retriever, Bulldog)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-card shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-square bg-slate-200"></div>
                <div className="p-4"><div className="h-6 bg-slate-200 rounded w-2/3"></div></div>
              </div>
            ))}
          </div>
        ) : filteredBreeds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBreeds.map((breedObj, idx) => (
              <BreedCard 
                key={`${breedObj.breed}-${breedObj.subBreed || ''}-${idx}`} 
                breed={breedObj.breed} 
                subBreed={breedObj.subBreed} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-slate-900 mb-2">No breeds found</h3>
            <p className="text-slate-500">Try adjusting your search term.</p>
          </div>
        )}
      </div>
    </>
  );
}
