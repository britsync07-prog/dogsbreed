import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import { formatBreedName } from '../utils/helpers';

interface BreedCardProps {
  breed: string;
  subBreed?: string;
}

export function BreedCard({ breed, subBreed }: BreedCardProps) {
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      try {
        const data = subBreed 
          ? await api.getSubBreedImages(breed, subBreed, 1)
          : await api.getBreedImages(breed, 1);
        setImage(data.message[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [breed, subBreed]);

  const displayName = formatBreedName(breed, subBreed);
  const slug = subBreed ? `${breed}-${subBreed}` : breed;

  return (
    <Link 
      to={`/breed/${slug}`}
      className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <img 
            src={image} 
            alt={`${displayName} dog`} 
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg tracking-tight">{displayName}</h3>
      </div>
    </Link>
  );
}
