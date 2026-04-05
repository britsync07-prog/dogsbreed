import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export function useAllBreeds() {
  const [breeds, setBreeds] = useState<{ breed: string; subBreed?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const data = await api.getAllBreeds();
        const breedList: { breed: string; subBreed?: string }[] = [];
        
        Object.keys(data.message).forEach(breed => {
          const subBreeds = data.message[breed];
          if (subBreeds.length > 0) {
            subBreeds.forEach((subBreed: string) => {
              breedList.push({ breed, subBreed });
            });
          } else {
            breedList.push({ breed });
          }
        });
        
        setBreeds(breedList);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    
    fetchBreeds();
  }, []);

  return { breeds, loading, error };
}

export function useRandomDog() {
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandom() {
      try {
        const data = await api.getRandomImage();
        setImage(data.message);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRandom();
  }, []);

  return { image, loading };
}
