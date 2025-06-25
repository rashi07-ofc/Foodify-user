import Hero from './Hero';
import Features from './Features';
import FoodifyHero from './FoodifyHero';
import FoodGallery from './FoodGallery';
import About from './About';
import Services from './Services';
import Navbar from '../../components/layout/Navbar';
import ChatWidget from './ChatWidget';

const LandingPage: React.FC = () => {
  return (
    <>
    <Navbar/>
      <Hero />
      <Features />
      <FoodifyHero />
      <FoodGallery />
      <About />
      <Services />
      <ChatWidget />
    </>
  );
};

export default LandingPage;
