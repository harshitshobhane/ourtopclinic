'use client';

import dynamic from 'next/dynamic';

const MessagesClient = dynamic(() => import('./MessagesClient'), { ssr: false });

interface MessagesWrapperProps {
  doctors: any[];
}

export default function MessagesWrapper({ doctors }: MessagesWrapperProps) {
  return <MessagesClient doctors={doctors} />;
} 