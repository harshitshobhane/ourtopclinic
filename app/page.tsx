'use client';

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { CheckCircle2, Clock, Calendar, MessageSquare, Menu, X, Search, ChevronDown, Stethoscope, Pill, Heart, Brain, Shield, FileText, Video, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import Link from "next/link";

interface AnimatedProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur-md fixed top-0 left-0 z-30">
        <Link href="/" className="text-2xl font-bold text-emerald-700 tracking-tight">
          Our Top Clinic
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-emerald-700 font-medium">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-emerald-700 transition-colors">About Us</Link>
          <Link href="#contact" className="text-gray-600 hover:text-emerald-700 transition-colors">Contact</Link>
        </nav>
      </header>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <section className="w-full py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Patients" },
                { number: "500+", label: "Verified Doctors" },
                { number: "24/7", label: "Support Available" },
                { number: "98%", label: "Patient Satisfaction" }
              ].map((stat, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Stethoscope,
                  title: "Expert Doctors",
                  description: "Access to qualified and experienced healthcare professionals"
                },
                {
                  icon: Pill,
                  title: "Easy Prescriptions",
                  description: "Get your prescriptions delivered to your doorstep"
                },
                {
                  icon: Heart,
                  title: "Personalized Care",
                  description: "Tailored healthcare solutions for your needs"
                }
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Book Appointment",
                  description: "Choose your preferred doctor and time slot"
                },
                {
                  number: "02",
                  title: "Video Consultation",
                  description: "Connect with your doctor through secure video call"
                },
                {
                  number: "03",
                  title: "Get Prescription",
                  description: "Receive digital prescription instantly"
                },
                {
                  number: "04",
                  title: "Medicine Delivery",
                  description: "Get medicines delivered to your doorstep"
                }
              ].map((step, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-emerald-600 font-semibold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="w-full py-20 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Video,
                  title: "Video Consultations",
                  description: "Connect with doctors from the comfort of your home"
                },
                {
                  icon: FileText,
                  title: "Digital Records",
                  description: "Access your medical history and prescriptions anytime"
                },
                {
                  icon: Phone,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance for all your queries"
                }
              ].map((service, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>



        {/* FAQ Section */}
        <section className="w-full py-20 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How do I book an appointment?",
                  answer: "Simply click on the 'Book Appointment' button, select your preferred doctor and time slot, and confirm your booking."
                },
                {
                  question: "Is the video consultation secure?",
                  answer: "Yes, we use end-to-end encryption for all video consultations to ensure your privacy and security."
                },
                {
                  question: "How do I get my prescription?",
                  answer: "After your consultation, you'll receive a digital prescription instantly. You can also get it delivered to your doorstep."
                },
                {
                  question: "What if I need emergency care?",
                  answer: "For emergencies, please visit your nearest hospital. Our service is for non-emergency consultations."
                }
              ].map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

       
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Our Top Clinic</h3>
              <p className="text-gray-400">
                Providing accessible and quality healthcare services to everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Video Consultations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Digital Prescriptions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Medicine Delivery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>123 Healthcare Street</li>
                <li>Medical District, City</li>
                <li>contact@ourtopclinic.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Our Top Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}