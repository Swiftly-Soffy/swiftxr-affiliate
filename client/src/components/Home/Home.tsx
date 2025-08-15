import CataloguePage from "../../pages/CataloguePage";
import HeroSection from "./HeroSection";

function Home() {
  return (
    <>
        <title>MarketPlace | SwiftXR</title>
        <meta
          name="description"
          content="SwiftXR Market Place"
        />
        <HeroSection />
        <CataloguePage />
    </>
  );
}

export default Home;
