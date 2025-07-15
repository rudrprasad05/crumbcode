"use client";

import Footer from "../../components/global/footer";
import Header from "../../components/global/header";
import AboutSection from "../../components/home/about-section";
import { GotOccasionComingUp } from "../../components/home/call-to-actions";
import ContactSection from "../../components/home/contact-section";
import FeaturesSection from "../../components/home/feature-section";
import Hero from "../../components/home/hero";
import PopularCakes from "../../components/home/popular-cakes";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PopularCakes />
      <AboutSection />
      <GotOccasionComingUp />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
