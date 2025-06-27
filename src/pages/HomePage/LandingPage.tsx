import Hero from './Hero';
import Features from './Features';
import FoodifyHero from './FoodifyHero';
import FoodGallery from './FoodGallery';
import About from './About';
import Services from './Services';
import Navbar from '../../components/layout/Navbar';
import Marquee from 'react-fast-marquee';
import MarqueeOffers from './MarqueeOffers';
import StatsCounter from './StatsCounter';


const LandingPage: React.FC = () => {
  return (
    <>
    <Navbar/>
    <MarqueeOffers/>
      <Hero />
      <Features />
      <FoodifyHero />
      <FoodGallery />
      
      <About />
      <Services />
      <StatsCounter/>
    </>
  );
};

export default LandingPage;
