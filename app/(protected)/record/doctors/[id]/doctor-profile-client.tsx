"use client";

import { PatientRatingContainer } from "@/components/patient-rating-container";
import { ProfileImage } from "@/components/profile-image";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

import { BsCalendarDateFill, BsPersonWorkspace } from "react-icons/bs";
import { FaBriefcaseMedical, FaCalendarDays } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { MdEmail, MdLocalPhone } from "react-icons/md";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

interface Appointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  status: string;
}

interface Rating {
  id: string;
  rating: number;
  comment: string;
  patient_name: string;
  created_at: string;
}

interface DoctorProfileClientProps {
  data: any;
  totalAppointment: number;
  availableDaysStr: string;
  recentApplications: Array<{
    id: string;
    patient_name: string;
    appointment_date: Date;
    status: string;
    contact: {
      phone: string;
      email: string;
    };
  }>;
  ratings: Array<{
    id: string;
    rating: number;
    comment: string;
    patient_name: string;
    created_at: Date;
  }>;
}

export const DoctorProfileClient = ({ 
  data, 
  totalAppointment, 
  availableDaysStr,
  recentApplications,
  ratings
}: DoctorProfileClientProps) => {
  const averageRating = ratings.length > 0
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    : 0;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/60 p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Doctor Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-6">
                  <ProfileImage
                    url={data?.img!}
                    name={data?.name}
                    className="size-24 sm:size-32 rounded-2xl shadow-lg"
                    bgColor={data?.colorCode!}
                    textClassName="text-4xl text-black"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {data?.name}
                    </h1>
                    <p className="text-gray-600 mb-4">
                      {data?.specialization}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MdEmail className="text-lg text-blue-500" />
                        <span>{data?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MdLocalPhone className="text-lg text-blue-500" />
                        <span>{data?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-blue-50 p-4 rounded-xl"
                  >
                    <FaBriefcaseMedical className="size-6 text-blue-500 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{totalAppointment}</h3>
                    <p className="text-sm text-gray-600">Total Appointments</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-emerald-50 p-4 rounded-xl"
                  >
                    <FaCalendarDays className="size-6 text-emerald-500 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{data?.working_days?.length}</h3>
                    <p className="text-sm text-gray-600">Working Days</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-50 p-4 rounded-xl"
                  >
                    <IoTimeSharp className="size-6 text-purple-500 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {availableDaysStr}
                    </h3>
                    <p className="text-sm text-gray-600">Working Hours</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-amber-50 p-4 rounded-xl"
                  >
                    <BsCalendarDateFill className="size-6 text-amber-500 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {format(data?.created_at, "yyyy-MM-dd")}
                    </h3>
                    <p className="text-sm text-gray-600">Joined Date</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link
                href={`/record/appointments?id=${data?.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>View all appointments</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 font-medium text-gray-600">Patient</th>
                    <th className="pb-3 font-medium text-gray-600">Date</th>
                    <th className="pb-3 font-medium text-gray-600">Status</th>
                    <th className="pb-3 font-medium text-gray-600">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.slice(0, 3).map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="py-3">{app.patient_name}</td>
                      <td className="py-3">{format(new Date(app.appointment_date), "MMM dd, yyyy")}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MdLocalPhone className="text-blue-500" />
                            <span>{app.contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MdEmail className="text-blue-500" />
                            <span>{app.contact.email}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl"
              >
                <Link
                  href={`/record/appointments?id=${data?.id}`}
                  className="flex items-center gap-3 text-blue-700 font-medium"
                >
                  <FaBriefcaseMedical className="size-5" />
                  <span>Doctor Appointments</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl"
              >
                <Link
                  href="#"
                  className="flex items-center gap-3 text-purple-700 font-medium"
                >
                  <FaCalendarDays className="size-5" />
                  <span>Apply for Leave</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl"
              >
                <Link
                  href="#"
                  className="flex items-center gap-3 text-emerald-700 font-medium"
                >
                  <BsPersonWorkspace className="size-5" />
                  <span>Update Profile</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl"
              >
                <Link
                  href="#"
                  className="flex items-center gap-3 text-amber-700 font-medium"
                >
                  <IoTimeSharp className="size-5" />
                  <span>Working Hours</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Ratings & Reviews */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ratings & Reviews</h2>
              <span className="text-sm text-gray-500">{ratings.length} total reviews</span>
            </div>

            {/* Rating Summary */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Based on {ratings.length} reviews</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-medium text-gray-900">Overall Rating</div>
                  <div className="text-xs text-gray-600">Last 30 days</div>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="space-y-6">
              {ratings.slice(0, 3).map((rating) => (
                <motion.div 
                  key={rating.id} 
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {rating.patient_name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{rating.patient_name}</div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(rating.created_at), "MMM dd, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{rating.comment}</p>
                </motion.div>
              ))}
            </div>

            {/* View All Reviews Link */}
            {ratings.length > 3 && (
              <div className="mt-6 text-center">
                <Link
                  href={`/record/doctors/${data?.id}/ratings-list`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>View all {ratings.length} reviews</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 