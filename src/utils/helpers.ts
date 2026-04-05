import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatBreedName(breed: string, subBreed?: string) {
  if (subBreed) {
    return `${capitalize(subBreed)} ${capitalize(breed)}`;
  }
  return capitalize(breed);
}
