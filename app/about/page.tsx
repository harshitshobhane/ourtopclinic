'use client';

import { motion } from "framer-motion";
import { Heart, Users, Award, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface AnimatedProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface AnimatedSlideProps extends AnimatedProps {
  direction?: "left" | "right";
}

// Client-side animated components
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

const AnimatedHero = ({ children, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedSlide = ({ children, direction = "left", className = "" }: AnimatedSlideProps) => (
  <motion.div
    initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b bg-white/80 backdrop-blur-md fixed top-0 left-0 z-30">
        <Link href="/" className="text-2xl font-bold text-emerald-700 tracking-tight">
          Our Top Clinic
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-emerald-700 transition-colors">Home</Link>
          <Link href="/about" className="text-emerald-700 font-medium">About Us</Link>
          <Link href="#contact" className="text-gray-600 hover:text-emerald-700 transition-colors">Contact</Link>
        </nav>
      </header>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="w-full py-16 bg-emerald-600 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <AnimatedHero>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Top Clinic
              </h1>
            </AnimatedHero>
            <AnimatedHero>
              <p className="text-xl text-emerald-100 max-w-4xl mx-auto">
                Providing exceptional healthcare services with compassion and innovation since 2010
              </p>
            </AnimatedHero>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSlide direction="left">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To provide accessible, high-quality healthcare services that improve the lives of our patients. We are committed to delivering personalized care with compassion and innovation.
                </p>
              </AnimatedSlide>
              <AnimatedSlide direction="right">
                <div className="bg-emerald-100 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To be the leading healthcare provider known for excellence in patient care, medical innovation, and community service. We strive to set new standards in healthcare delivery.
                  </p>
                </div>
              </AnimatedSlide>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-20 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "We treat every patient with empathy and understanding, recognizing their unique needs and circumstances."
                },
                {
                  icon: Users,
                  title: "Excellence",
                  description: "We maintain the highest standards of medical care and continuously strive for improvement."
                },
                {
                  icon: Award,
                  title: "Integrity",
                  description: "We conduct our practice with honesty, transparency, and ethical principles."
                },
                {
                  icon: Clock,
                  title: "Innovation",
                  description: "We embrace new technologies and methods to provide better healthcare solutions."
                }
              ].map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Chief Medical Officer",
                  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80"
                },
                {
                  name: "Dr. Michael Chen",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80"
                },
                {
                  name: "Dr. Emily Rodriguez",
                  role: "Director of Patient Care",
                  image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80"
                }
              ].map((member, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-square relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 bg-emerald-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSlide direction="left">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-gray-600">
                    <span className="font-semibold">Address:</span>
                    123 Healthcare Street, Medical District, City
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <span className="font-semibold">Phone:</span>
                    (555) 123-4567
                  </p>
                  <p className="flex items-center gap-3 text-gray-600">
                    <span className="font-semibold">Email:</span>
                    contact@ourtopclinic.com
                  </p>
                </div>
              </AnimatedSlide>
              <AnimatedSlide direction="right">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </AnimatedSlide>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 