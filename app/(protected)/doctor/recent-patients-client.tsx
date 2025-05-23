"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProfileImage } from "../../../components/profile-image";
import { User, Calendar, Phone, Mail } from 'lucide-react';

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  gender?: string | null;
  img?: string | null;
  colorCode?: string | null;
  name: string;
  lastVisit: string;
  phone: string;
  email: string;
}

interface RecentPatientsClientProps {
  patients: Patient[];
}

const RecentPatientsClient = ({ patients }: RecentPatientsClientProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0f2fe',
        padding: '1rem',
        marginBottom: '2rem'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Recent Patients</h2>
        <Link
          href="/doctor/patients"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {patients.map((patient) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">{patient.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{patient.lastVisit}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{patient.email}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentPatientsClient; 