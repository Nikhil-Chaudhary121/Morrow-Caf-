import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Signature from "@/components/Signature";
import Story from "@/components/Story";
import Space from "@/components/Space";
import Footer from "@/components/Footer";
import ClaimOfferModal from "@/components/ClaimOfferModal";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Signature />
      <Story />
      <Space />
      <Footer />
      <ClaimOfferModal />
    </main>
  );
}
