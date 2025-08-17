import CataloguePage from "../../pages/CataloguePage";
import HeroSection from "./HeroSection";
import Footer from "../Footer/Footer";
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
        <Footer />
    </>
  );
}

export default Home;
