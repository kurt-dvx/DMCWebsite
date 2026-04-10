import Hero from "../components/Hero";
import About from "../components/About";
import Disciplines from "../components/Disciplines";
import EventsCalendar from "../components/EventsCalendar";
import Gallery from "../components/Gallery";
import TeamSection from "../components/TeamSection";
import FAQ from "../components/FAQ";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Disciplines />
      <EventsCalendar />
      <Gallery />
      <TeamSection />
      <FAQ />
    </>
  );
};

export default HomePage;