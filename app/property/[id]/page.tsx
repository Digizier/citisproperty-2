import React from 'react';
import PropertyDetailClient from '@/components/PropertyDetailClient';

export async function generateStaticParams() {
  return [
    { id: 'prop-ch-fsd-1' },
    { id: 'prop-ch-fsd-2' },
    { id: 'prop-ch-fsd-3' },
    { id: 'prop-ch-fsd-4' },
    { id: 'prop-ch-fsd-5' },
    { id: 'prop-ch-fsd-6' },
    { id: 'prop-ch-fsd-7' },
    { id: 'prop-ch-fsd-8' },
    { id: 'prop-ch-fsd-9' },
    { id: 'prop-ch-fsd-10' },
  ];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PageProps) {
  return <PropertyDetailClient idOrSlug={params.id} />;
}
