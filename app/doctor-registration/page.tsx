"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { HeartPulse, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useUser } from "@clerk/nextjs";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const specializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Obstetrics",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology"
];

type WorkingDay = {
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

const formSchema = z.object({
  employmentType: z.string().min(1, { message: "Please select an employment type" }),
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  specialization: z.string().min(1, { message: "Please select a specialization" }),
  department: z.string().min(1, { message: "Department is required" }),
  licenseNumber: z.string().min(5, { message: "Valid license number is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().min(10, { message: "Valid contact number is required" }),
  address: z.string().min(5, { message: "Valid address is required" }),
  npiNumber: z.string().min(5, { message: "Valid NPI number is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid zip code is required" }),
  yearsInPractice: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Years in practice must be a number",
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  workingDays: z.record(z.object({
    isWorking: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  })),
});

const DoctorRegistration = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!isLoaded || !user) return;

      try {
        // Check if user already has a role
        if (user.publicMetadata?.role === 'doctor') {
          // If they have a pending status, redirect to pending page
          if (user.publicMetadata?.status === 'pending') {
            router.push('/doctor-registration/pending');
            return;
          }
          // If they're approved, redirect to doctor dashboard
          router.push('/doctor');
          return;
        }

        // Check if doctor data exists in database
        const response = await fetch(`/api/doctors/check?userId=${user.id}`);
        const data = await response.json();

        if (data.exists) {
          // If doctor exists but no role set, update the role and redirect
          await user.update({
            unsafeMetadata: {
              role: 'doctor',
              status: data.status || 'pending'
            }
          });
          
          if (data.status === 'pending') {
            router.push('/doctor-registration/pending');
          } else {
            router.push('/doctor');
          }
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Error checking registration status:', error);
        toast({
          title: "Error",
          description: "Failed to check registration status. Please try again.",
          variant: "destructive",
        });
      }
    };

    checkRegistrationStatus();
  }, [user, isLoaded, router, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employmentType: "Full-Time",
      fullName: "",
      specialization: "",
      department: "",
      licenseNumber: "",
      email: "",
      contactNumber: "",
      address: "",
      npiNumber: "",
      city: "",
      state: "",
      zipCode: "",
      yearsInPractice: "",
      password: "",
      workingDays: {
        sunday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        monday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        tuesday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        wednesday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        thursday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        friday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
        saturday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      // Map frontend fields to backend Doctor model fields
      const response = await fetch('/api/doctors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.fullName, // full name
          specialization: data.specialization,
          license_number: data.licenseNumber,
          phone: data.contactNumber,
          address: data.address,
          department: data.department,
          type: data.employmentType === 'Full-Time' ? 'FULL' : 'PART',
          city: data.city,
          state: data.state,
          zip: data.zipCode,
          npi_number: data.npiNumber,
          years_in_practice: data.yearsInPractice,
          // add any other fields as needed
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(result); // See backend error
        throw new Error(result.error || 'Failed to register doctor');
      }
      toast({
        title: 'Registration Successful!',
        description: 'Your application has been submitted and is under review.',
        duration: 3000,
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/doctor-registration/pending');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'There was a problem submitting your registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Checking registration status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mr-3">
              <HeartPulse className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">OurTopClinic</h1>
          </div>
          
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Doctor Registration</CardTitle>
              <CardDescription>
                Complete your profile to join our healthcare provider network
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    {/* Employment Type */}
                    <FormField
                      control={form.control}
                      name="employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-Time">Full-Time</SelectItem>
                              <SelectItem value="Part-Time">Part-Time</SelectItem>
                              <SelectItem value="Consultant">Consultant</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doctor's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Specialization and Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="specialization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select specialization" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {specializations.map((specialization) => (
                                  <SelectItem key={specialization} value={specialization}>
                                    {specialization}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Input placeholder="OPD" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* License Number */}
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input placeholder="License Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Email and Contact Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="1479 Street, Apt 1839-A NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* NPI Number */}
                    <FormField
                      control={form.control}
                      name="npiNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NPI Number</FormLabel>
                          <FormControl>
                            <Input placeholder="NPI Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* City, State, Zip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Zip Code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Years in Practice */}
                    <FormField
                      control={form.control}
                      name="yearsInPractice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years in Practice</FormLabel>
                          <FormControl>
                            <Input placeholder="Years in Practice" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a secure password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Working Days */}
                    <div>
                      <FormLabel>Working Days</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {[
                          { day: "sunday", label: "Sunday" },
                          { day: "monday", label: "Monday" },
                          { day: "tuesday", label: "Tuesday" },
                          { day: "wednesday", label: "Wednesday" },
                          { day: "thursday", label: "Thursday" },
                          { day: "friday", label: "Friday" },
                          { day: "saturday", label: "Saturday" },
                        ].map(({ day, label }) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name={`workingDays.${day}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col space-y-2 rounded-md border p-3">
                                <div className="flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                      checked={field.value?.isWorking}
                                      onCheckedChange={(checked) => {
                                        field.onChange({
                                          ...field.value,
                                          isWorking: checked,
                                        });
                                      }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {label}
                                </FormLabel>
                                </div>
                                {field.value?.isWorking && (
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    <FormField
                                      control={form.control}
                                      name={`workingDays.${day}.startTime`}
                                      render={({ field: timeField }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              type="time"
                                              {...timeField}
                                              onChange={(e) => {
                                                timeField.onChange(e.target.value);
                                              }}
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={form.control}
                                      name={`workingDays.${day}.endTime`}
                                      render={({ field: timeField }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input
                                              type="time"
                                              {...timeField}
                                              onChange={(e) => {
                                                timeField.onChange(e.target.value);
                                              }}
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                )}
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="font-medium">Important Notice</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your registration will be reviewed by our administrators. 
                        You will receive access to the full platform once your credentials are verified.
                      </p>
                    </div>
                  </div>
                  
                  <CardFooter className="flex justify-between px-0">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        if (user?.publicMetadata?.role === 'doctor') {
                          router.push('/doctor');
                        } else {
                          router.push('/onboarding');
                        }
                      }}
                    >
                      {user?.publicMetadata?.role === 'doctor' ? 'Back to Dashboard' : 'Back'}
                    </Button>
                    <Button 
                      type="submit" 
                      className="gradient-bg"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorRegistration; 