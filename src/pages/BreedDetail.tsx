import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { api } from '../utils/api';
import { formatBreedName, capitalize } from '../utils/helpers';
import { ArrowLeft, Heart } from 'lucide-react';

export function BreedDetail() {
  const { breed: breedSlug } = useParams<{ breed: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Parse slug back to breed and subBreed
  const parts = breedSlug?.split('-') || [];
  const breed = parts[0];
  const subBreed = parts.length > 1 ? parts[1] : undefined;
  
  const displayName = breed ? formatBreedName(breed, subBreed) : 'Unknown Breed';

  useEffect(() => {
    if (!breed) return;

    async function fetchImages() {
      try {
        setLoading(true);
        const data = subBreed 
          ? await api.getSubBreedImages(breed, subBreed, 12)
          : await api.getBreedImages(breed, 12);
        setImages(data.message);
      } catch (err) {
        setError('Failed to load breed images. The breed might not exist.');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();

    // Check favorites
    const favs = JSON.parse(localStorage.getItem('favoriteBreeds') || '[]');
    setIsFavorite(favs.includes(breedSlug));
  }, [breed, subBreed, breedSlug]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favoriteBreeds') || '[]');
    let newFavs;
    if (isFavorite) {
      newFavs = favs.filter((f: string) => f !== breedSlug);
    } else {
      newFavs = [...favs, breedSlug];
    }
    localStorage.setItem('favoriteBreeds', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Oops!</h2>
        <p className="text-slate-600 mb-8">{error}</p>
        <Link to="/breeds" className="text-blue-600 hover:underline">
          &larr; Back to all breeds
        </Link>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "mainEntity": {
      "@type": "Thing",
      "name": displayName,
      "description": `Information and image gallery for the ${displayName} dog breed.`,
      "image": images.length > 0 ? images[0] : undefined
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What does a ${displayName} look like?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can view our extensive gallery of ${displayName} images above to see various examples of this breed.`
        }
      },
      {
        "@type": "Question",
        "name": `Is the ${displayName} a recognized breed?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, the ${displayName} is a recognized breed or sub-breed included in the comprehensive Dog CEO database.`
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title={`${displayName} Dog Breed Information & Pictures`} 
        description={`View a beautiful gallery of ${displayName} dogs. Learn more about the ${displayName} breed characteristics and see high-quality photos.`}
        canonicalUrl={`https://your-domain.com/breed/${breedSlug}`}
        schema={schema}
      />
      {/* Inject FAQ Schema separately */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="container mx-auto px-4 py-8">
        <Link to="/breeds" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Breeds
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
              {displayName}
            </h1>
            <p className="text-lg text-slate-500">
              {subBreed ? `A sub-breed of ${capitalize(breed)}` : 'Recognized Dog Breed'}
            </p>
          </div>
          <button 
            onClick={toggleFavorite}
            className={`inline-flex items-center px-4 py-2 rounded-lg border font-medium transition-colors ${
              isFavorite 
                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
          </button>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Image Gallery</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={img} 
                    alt={`${displayName} dog ${idx + 1}`} 
                    loading={idx < 4 ? "eager" : "lazy"}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO Content & FAQ */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About the {displayName}</h2>
            <p>
              The {displayName} is a fascinating dog breed known for its unique characteristics. 
              While our database primarily focuses on providing high-quality imagery, the visual 
              diversity of the {displayName} speaks volumes about its heritage and breeding.
            </p>
            <p>
              Browse through our extensive gallery above to see various examples of the {displayName}. 
              Notice the variations in coat color, size, and facial features that make each dog unique, 
              yet distinctly a {displayName}.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-fit">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">What does a {displayName} look like?</h4>
                <p className="text-sm text-slate-600">You can view our extensive gallery of {displayName} images above to see various examples of this breed.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Is the {displayName} a recognized breed?</h4>
                <p className="text-sm text-slate-600">Yes, the {displayName} is a recognized breed or sub-breed included in the comprehensive Dog CEO database.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
