"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import FooterSection from '@/components/sections/FooterSection';
import ScrollToTop from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Contact = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    document.title = 'Contact Us - OurTopClinic';
  }, []);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('submitted');
      toast({
        title: "Message sent successfully! 🎉",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
    }, 1500);
  };

  // Contact information with enhanced styling
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 888-932-4771'],
      color: 'text-blue-500',
      gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@ourtopclinic.com'],
      color: 'text-amber-500',
      gradient: 'from-amber-500/20 to-amber-600/20'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Ourtopclinic', '550 SE 6th St Ste 200-V, Delray Beach, FL 33483, United States'],
      color: 'text-rose-500',
      gradient: 'from-rose-500/20 to-rose-600/20'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Monday-Friday: 9am-7pm', 'Saturday-Sunday: 9am-7pm', 'Memorial Day: Hours may vary'],
      color: 'text-emerald-500',
      gradient: 'from-emerald-500/20 to-emerald-600/20'
    }
  ];

  // Enhanced FAQ questions with more details
  const faqs = [
    {
      question: 'How quickly can I expect a response?',
      answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call our main line directly.',
      icon: Clock
    },
    {
      question: 'What partnership opportunities do you offer?',
      answer: 'We offer various partnership models including facility sharing, provider networks, corporate wellness programs, and community health initiatives.',
      icon: Sparkles
    },
    {
      question: 'Do you offer telehealth solutions?',
      answer: 'Yes, we provide comprehensive telehealth platforms that can be integrated with existing systems or deployed as standalone solutions.',
      icon: Phone
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-white dark:from-primary/20 dark:via-accent/20 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'block' }}
            >
              Get In Touch
            </motion.h1>
          </div>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'block' }}
            >
              Have questions about our services or partnership opportunities? 
              We're here to help. Reach out to our team for assistance.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Enhanced Contact Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Enhanced Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-none overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r  pb-6">
                  <CardTitle className="text-2xl">Contact Form</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    {formStatus === 'submitted' ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          style={{ display: 'block' }}
                        >
                          <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                              style={{ display: 'block' }}
                            >
                              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <form onSubmit={handleSubmit}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'block' }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input 
                                  id="name"
                                  placeholder="John Doe"
                                  required
                                  className="bg-muted/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input 
                                  id="email"
                                  type="email"
                                  placeholder="johndoe@example.com"
                                  required
                                  className="bg-muted/40 focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number (Optional)</Label>
                              <Input 
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="bg-muted/40 focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="subject">Inquiry Type</Label>
                              <Select>
                                <SelectTrigger className="bg-muted/40 focus:ring-2 focus:ring-primary/20 transition-all">
                                  <SelectValue placeholder="Select an inquiry type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                                  <SelectItem value="services">Services Information</SelectItem>
                                  <SelectItem value="careers">Career Opportunities</SelectItem>
                                  <SelectItem value="support">Technical Support</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="message">Your Message</Label>
                              <Textarea 
                                id="message"
                                placeholder="Please provide details about your inquiry..."
                                rows={5}
                                required
                                className="bg-muted/40 resize-none focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                            
                            <Button 
                              type="submit" 
                              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                              disabled={formStatus === 'submitting'}
                            >
                              {formStatus === 'submitting' ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{ display: 'block' }}
                                  />
                                </div>
                              ) : (
                                <>
                                  Send Message
                                  <Send className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.form>
            
            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="h-full">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-white dark:bg-gray-800 shadow-md border-none hover:shadow-lg transition-all hover:-translate-y-1 duration-300 h-full min-h-[180px] flex flex-col justify-between">
                            <CardContent className="p-6 flex flex-col h-full">
                              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                                <Icon className={`h-6 w-6 ${item.color}`} />
                              </div>
                              <h3 className="font-bold mb-2">{item.title}</h3>
                              <div className="space-y-1 flex-1">
                                {item.details.map((detail, i) => (
                                  <p
                                    key={i}
                                    className={`text-muted-foreground text-sm ${item.title === 'Address' ? 'break-words' : ''}`}
                                  >
                                    {detail}
                                  </p>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Enhanced FAQ Section */}
              <Card className="bg-white dark:bg-gray-800 shadow-md border-none">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => {
                      const Icon = faq.icon;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border bg-muted/30 cursor-pointer transition-all hover:bg-muted/50 ${
                            activeFAQ === index ? 'ring-2 ring-primary/20' : ''
                          }`}
                          onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">{faq.question}</h4>
                                <AnimatePresence>
                                  {activeFAQ === index && (
                                    <div className="text-sm text-muted-foreground overflow-hidden">
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                      >
                                        {faq.answer}
                                      </motion.div>
                                    </div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section - Enhanced */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white dark:bg-gray-800 shadow-md border-none overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle>Our Location</CardTitle>
                  <CardDescription>Visit us at our main office in Delray Beach</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-[400px] md:h-[500px] w-full">
                    {!mapLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                      </div>
                    )}
                    <iframe
                      title="Ourtopclinic Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.1234567890123!2d-80.0723!3d26.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d8c5c5c5c5c5c5%3A0x1234567890abcdef!2s550%20SE%206th%20St%20Ste%20200-V%2C%20Delray%20Beach%2C%20FL%2033483!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => setMapLoaded(true)}
                      className="transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <p>550 SE 6th St Ste 200-V, Delray Beach, FL 33483, United States</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/30 to-accent/30 mt-12">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive the latest updates about our services and healthcare insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                type="email" 
                className="bg-white/80 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm" 
              />
              <Button asChild className="whitespace-nowrap bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Link href="/about_us">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
