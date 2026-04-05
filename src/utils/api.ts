const BASE_URL = 'https://dog.ceo/api';

const cache = new Map<string, any>();

async function fetchWithCache(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export const api = {
  async getAllBreeds() {
    return fetchWithCache(`${BASE_URL}/breeds/list/all`);
  },
  async getRandomImage() {
    // We don't cache random image so it's fresh every time
    const res = await fetch(`${BASE_URL}/breeds/image/random`);
    if (!res.ok) throw new Error('Failed to fetch random image');
    return res.json();
  },
  async getBreedImages(breed: string, count: number = 10) {
    return fetchWithCache(`${BASE_URL}/breed/${breed}/images/random/${count}`);
  },
  async getSubBreedImages(breed: string, subBreed: string, count: number = 10) {
    return fetchWithCache(`${BASE_URL}/breed/${breed}/${subBreed}/images/random/${count}`);
  }
};
