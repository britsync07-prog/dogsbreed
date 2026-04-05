import { Link } from 'react-router-dom';
import { Dog } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-primary">
          <Dog className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">DogBreedExplorer</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/breeds" className="transition-colors hover:text-foreground/80 text-foreground/60">
            All Breeds
          </Link>
        </nav>
      </div>
    </header>
  );
}
