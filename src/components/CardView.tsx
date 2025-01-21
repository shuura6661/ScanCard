import React from 'react';
import { Mail, Phone, Globe, Building2, User } from 'lucide-react';
import type { PersonalInfo } from '../types';

interface CardViewProps {
  data: PersonalInfo;
}

export function CardView({ data }: CardViewProps) {
  const handleEmailClick = () => {
    window.location.href = `mailto:${data.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${data.phone}`;
  };

  const handleWhatsAppClick = () => {
    const cleanPhone = data.phone.replace(/\D/g, '');
    window.location.href = `https://wa.me/${cleanPhone}`;
  };

  const handleWebsiteClick = () => {
    window.open(data.website, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-8">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      
      <div className="pt-20 pb-8 px-8">
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <p className="text-xl text-gray-600">{data.title}</p>
        <div className="flex items-center mt-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          <span className="ml-2 text-gray-600">{data.company}</span>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={handleEmailClick}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors w-full"
          >
            <Mail className="w-5 h-5" />
            <span>{data.email}</span>
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={handlePhoneClick}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
            >
              <span className="text-sm">WhatsApp</span>
            </button>
          </div>
          
          {data.website && (
            <button
              onClick={handleWebsiteClick}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>{data.website}</span>
            </button>
          )}
        </div>
        
        {data.about && (
          <div className="mt-8">
            <div className="flex items-center space-x-3 text-gray-700 mb-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">About</span>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{data.about}</p>
          </div>
        )}
      </div>
    </div>
  );
}