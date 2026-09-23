import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import PromotionalBanners from '@/components/PromotionalBanners';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewArrivals from '@/components/NewArrivals';
import TrustSection from '@/components/TrustSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <PromotionalBanners />
        <FeaturedProducts />
        <NewArrivals />
        <TrustSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
