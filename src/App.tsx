/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Breeds = lazy(() => import('./pages/Breeds').then(module => ({ default: module.Breeds })));
const BreedDetail = lazy(() => import('./pages/BreedDetail').then(module => ({ default: module.BreedDetail })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="breeds" element={<Breeds />} />
              <Route path="breed/:breed" element={<BreedDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
