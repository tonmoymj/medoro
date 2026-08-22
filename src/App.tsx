import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Doctors from "@/components/Doctors";
import DoctorProfile from "@/components/DoctorProfile";
import Hospitals from "@/components/Hospitals";
import HospitalProfile from "@/components/HospitalProfile";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Cities from "@/components/Cities";
import AdminPreview from "@/components/AdminPreview";
import JoinUs from "@/components/JoinUs";
import Ambulance from "@/components/Ambulance";
import BloodBank from "@/components/BloodBank";
import Oxygen from "@/components/Oxygen";
import Hotlines from "@/components/Hotlines";
import BmiCalculator from "@/components/BmiCalculator";
import SymptomChecker from "@/components/SymptomChecker";
import Medicines from "@/components/Medicines";
import Indications from "@/components/Indications";
import Pharmacies from "@/components/Pharmacies";
import Community from "@/components/Community";
import Caregivers from "@/components/Caregivers";
import Physio from "@/components/Physio";
import Telemedicine from "@/components/Telemedicine";
import Equipment from "@/components/Equipment";
import Camps from "@/components/Camps";
import Notices from "@/components/Notices";
import Faq from "@/components/Faq";
import Jobs from "@/components/Jobs";
import Reviews from "@/components/Reviews";
import AdSlot from "@/components/AdSlot";
import NotFound from "@/components/NotFound";

type View =
  | "home" | "doctors" | "doctor" | "hospitals" | "hospital"
  | "about" | "blog" | "contact" | "cities" | "admin" | "join"
  | "ambulance" | "bloodbank" | "oxygen" | "hotlines"
  | "bmi" | "symptom" | "medicines" | "indications" | "pharmacies" | "community"
  | "caregivers" | "physio" | "telemedicine" | "equipment" | "camps" | "notices" | "faq" | "jobs" | "reviews"
  | "notfound";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [activeDoctorId, setActiveDoctorId] = useState<string>("1");
  const [activeHospitalId, setActiveHospitalId] = useState<string>("rmch");

  const go = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const openDoctor = (id: string) => {
    setActiveDoctorId(id);
    go("doctor");
  };

  const openHospital = (id: string) => {
    setActiveHospitalId(id);
    go("hospital");
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper font-body">
      <Nav view={view} go={go} />
      <div className="mx-auto max-w-6xl px-5 pt-4">
        <AdSlot variant="leaderboard" label="হাসপাতাল/ক্লিনিক/ফার্মা কোম্পানির লিডারবোর্ড বিজ্ঞাপন — সব পেজে দেখা যাবে" />
      </div>
      <main key={view} className="flex-1 animate-page-in">
        {view === "home" && <Home go={go} openDoctor={openDoctor} openHospital={openHospital} />}
        {view === "doctors" && <Doctors openDoctor={openDoctor} />}
        {view === "doctor" && (
          <DoctorProfile id={activeDoctorId} back={() => go("doctors")} openHospital={openHospital} />
        )}
        {view === "hospitals" && <Hospitals openHospital={openHospital} />}
        {view === "hospital" && (
          <HospitalProfile id={activeHospitalId} back={() => go("hospitals")} openDoctor={openDoctor} />
        )}
        {view === "about" && <About />}
        {view === "blog" && <Blog />}
        {view === "contact" && <Contact />}
        {view === "cities" && <Cities go={go} />}
        {view === "admin" && <AdminPreview />}
        {view === "join" && <JoinUs />}
        {view === "ambulance" && <Ambulance />}
        {view === "bloodbank" && <BloodBank />}
        {view === "oxygen" && <Oxygen />}
        {view === "hotlines" && <Hotlines />}
        {view === "bmi" && <BmiCalculator />}
        {view === "symptom" && <SymptomChecker go={go} />}
        {view === "medicines" && <Medicines />}
        {view === "indications" && <Indications />}
        {view === "pharmacies" && <Pharmacies />}
        {view === "community" && <Community />}
        {view === "caregivers" && <Caregivers />}
        {view === "physio" && <Physio />}
        {view === "telemedicine" && <Telemedicine />}
        {view === "equipment" && <Equipment />}
        {view === "camps" && <Camps />}
        {view === "notices" && <Notices />}
        {view === "faq" && <Faq />}
        {view === "jobs" && <Jobs />}
        {view === "reviews" && <Reviews />}
        {view === "notfound" && <NotFound go={go} />}
      </main>
      <div className="mx-auto max-w-6xl px-5 pb-4">
        <AdSlot variant="strip" label="স্পনসরড স্ট্রিপ বিজ্ঞাপন" />
      </div>
      <Footer go={go} />
    </div>
  );
}
