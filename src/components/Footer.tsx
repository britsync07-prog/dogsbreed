import { Dog } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-primary">
          <Dog className="h-5 w-5" />
          <span className="font-semibold">DogBreedExplorer</span>
        </div>
        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} DogBreedExplorer. Powered by Dog CEO API.
        </p>
      </div>
    </footer>
  );
}
