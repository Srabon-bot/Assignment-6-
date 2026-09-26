import Hero from "../components/homepage/Hero";
import Library from "../components/homepage/Library";

const Home = () => {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Library />
    </div>
  );
};

export default Home;
