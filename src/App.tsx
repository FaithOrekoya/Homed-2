/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Language, ProductItem } from './data/content';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { ProductShowcase } from './components/ProductShowcase';
import { WhyHomed } from './components/WhyHomed';
import { ManufacturingSection } from './components/ManufacturingSection';
import { PartnerSection } from './components/PartnerSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsSection } from './components/NewsSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

// Modals & Drawers
import { DistributorModal } from './components/DistributorModal';
import { ProductModal } from './components/ProductModal';
import { CatalogueModal } from './components/CatalogueModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';

// Dedicated Sub-Pages
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search || '/';
    }
    return '/';
  });

  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [distributorNotes, setDistributorNotes] = useState<string>('');
  const [distributorProduct, setDistributorProduct] = useState<string>('');
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  const handleOpenDistributorWithCart = (notes: string) => {
    setDistributorNotes(notes);
    setDistributorProduct('Multiple Selected Models');
    setIsDistributorOpen(true);
  };

  const handleOpenDistributorForProduct = (productModel?: string) => {
    if (productModel) {
      setDistributorProduct(productModel);
      setDistributorNotes(`Product Inquiry regarding model ${productModel}`);
    } else {
      setDistributorProduct('');
      setDistributorNotes('');
    }
    setIsDistributorOpen(true);
  };

  // Parse path and potential query params
  const [pathname, searchStr] = currentPath.split('?');
  const searchParams = new URLSearchParams(searchStr || '');
  const categoryParam = searchParams.get('category') || undefined;

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#171A20] selection:bg-[#D80048] selection:text-white">
        
        {/* Modern Top Header */}
        <Navbar
          lang={lang}
          onToggleLang={toggleLang}
          onOpenDistributor={() => handleOpenDistributorForProduct()}
          onOpenSearch={() => setIsSearchOpen(true)}
          currentPath={pathname}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Multi-Page Router */}
        <main className="flex-1">
          {pathname === '/shop' ? (
            <ShopPage
              lang={lang}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenDistributor={(model) => handleOpenDistributorForProduct(model)}
              initialCategory={categoryParam}
              onNavigate={handleNavigate}
            />
          ) : pathname === '/about' ? (
            <AboutPage
              lang={lang}
              onOpenDistributor={() => handleOpenDistributorForProduct()}
              onNavigate={handleNavigate}
            />
          ) : pathname === '/news' ? (
            <NewsPage lang={lang} onNavigate={handleNavigate} />
          ) : pathname === '/contact' ? (
            <ContactPage lang={lang} onNavigate={handleNavigate} />
          ) : pathname === '/cart' ? (
            <CartPage
              lang={lang}
              onNavigate={handleNavigate}
              onOpenDistributorWithCart={handleOpenDistributorWithCart}
            />
          ) : (
            /* Default: Homepage (/) */
            <>
              {/* Hero */}
              <Hero
                lang={lang}
                onOpenDistributor={() => handleOpenDistributorForProduct()}
                onExploreProducts={() => handleNavigate('/shop')}
              />

              {/* Trust / Credibility Strip */}
              <TrustStrip lang={lang} />

              {/* About HOMED */}
              <AboutSection
                lang={lang}
                onExploreCapabilities={() => handleNavigate('/about')}
              />

              {/* Product Showcase */}
              <ProductShowcase
                lang={lang}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />

              {/* Why HOMED */}
              <WhyHomed lang={lang} />

              {/* Manufacturing & R&D */}
              <ManufacturingSection
                lang={lang}
                onOpenDistributor={() => handleOpenDistributorForProduct()}
              />

              {/* Partner with HOMED */}
              <PartnerSection
                lang={lang}
                onOpenDistributor={() => handleOpenDistributorForProduct()}
                onOpenCatalogue={() => setIsCatalogueOpen(true)}
              />

              {/* Reviews / Trust */}
              <TestimonialsSection lang={lang} />

              {/* Clinical & Industry News */}
              <NewsSection lang={lang} onNavigate={handleNavigate} />

              {/* Final CTA */}
              <FinalCTA
                lang={lang}
                onOpenDistributor={() => handleOpenDistributorForProduct()}
                onOpenContact={() => handleNavigate('/contact')}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          lang={lang}
          onToggleLang={toggleLang}
          onOpenDistributor={() => handleOpenDistributorForProduct()}
          onOpenCatalogue={() => setIsCatalogueOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Global Modals & Drawers */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          lang={lang}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onNavigate={handleNavigate}
        />

        <CartDrawer
          lang={lang}
          onNavigate={handleNavigate}
          onOpenDistributorWithCart={handleOpenDistributorWithCart}
        />

        <DistributorModal
          isOpen={isDistributorOpen}
          onClose={() => {
            setIsDistributorOpen(false);
            setDistributorNotes('');
            setDistributorProduct('');
          }}
          lang={lang}
          initialNotes={distributorNotes}
          initialProduct={distributorProduct}
        />

        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          lang={lang}
          onOpenDistributor={(model) => handleOpenDistributorForProduct(model)}
        />

        <CatalogueModal
          isOpen={isCatalogueOpen}
          onClose={() => setIsCatalogueOpen(false)}
          lang={lang}
        />

      </div>
    </CartProvider>
  );
}
