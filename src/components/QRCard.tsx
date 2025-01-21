import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { PersonalInfo } from '../types';

interface QRCardProps {
  data: PersonalInfo;
}

export function QRCard({ data }: QRCardProps) {
  // Create a URL-safe base64 encoded string of the data
  const encodedData = btoa(JSON.stringify({
    n: data.name,
    t: data.title,
    e: data.email,
    p: data.phone,
    w: data.website,
    c: data.company,
    a: data.about,
    i: data.avatar
  }));
  
  // Generate the full URL for the QR code
  const qrUrl = `${window.location.origin}/card#${encodedData}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg" style={{ width: '85.6mm', height: '53.98mm' }}>
      <div className="flex items-center space-x-4 h-full">
        <div className="flex-shrink-0">
          <QRCodeSVG
            value={qrUrl}
            size={150}
            level="M"
            includeMargin={false}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between h-full py-2">
          {data.avatar && (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-16 h-16 rounded-full object-cover mb-2"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">{data.name}</h3>
            <p className="text-sm text-gray-600">{data.title}</p>
            <p className="text-xs text-gray-500">{data.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}