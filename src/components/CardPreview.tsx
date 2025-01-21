import React, { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BusinessCard, Theme } from '../types';
import { Mail, Phone, Globe, Linkedin, Twitter, Github, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CardPreviewProps {
  card: BusinessCard;
  theme: Theme;
  mode?: 'qr' | 'full';
}

export default function CardPreview({ card, theme, mode = 'full' }: CardPreviewProps) {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const fullCardRef = React.useRef<HTMLDivElement>(null);
  const [qrCodeValue, setQrCodeValue] = useState<string>('');

  useEffect(() => {
    if (mode === 'qr') {
      // Create a minimal card data object
      const cardData = {
        name: card.name,
        jobTitle: card.jobTitle,
        company: card.company,
        email: card.email,
        phone: card.phone,
        website: card.website,
        linkedin: card.linkedin,
        twitter: card.twitter,
        github: card.github
      };
      
      // Convert to base64 string
      const dataString = btoa(JSON.stringify(cardData));
      setQrCodeValue(dataString);
    }
  }, [card, mode]);

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      // Calculate the dimensions for a standard business card (3.5 x 2 inches at 300 DPI)
      const width = 1050; // 3.5 inches * 300 DPI
      const height = 600; // 2 inches * 300 DPI

      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Increase resolution
        useCORS: true, // Enable CORS for images
        allowTaint: true,
        backgroundColor: theme.bgColor,
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-preview-card]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.width = `${width}px`;
            clonedElement.style.height = `${height}px`;
            clonedElement.style.transform = 'none';
            clonedElement.style.margin = '0';
          }
        }
      });

      // Create a temporary canvas for proper cropping
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const ctx = tempCanvas.getContext('2d');
      
      if (ctx) {
        // Fill background
        ctx.fillStyle = theme.bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw the captured content centered
        ctx.drawImage(
          canvas,
          0, 0, canvas.width, canvas.height,
          0, 0, width, height
        );

        // Create download link
        const link = document.createElement('a');
        link.download = `${card.name || 'business'}-${mode}-card.png`;
        link.href = tempCanvas.toDataURL('image/png', 1.0);
        link.click();
      }
    } catch (error) {
      console.error('Error downloading card:', error);
    }
  };

  const QRCard = () => (
    <div className="w-full max-w-md mx-auto">
      <div
        data-preview-card
        className="p-8 rounded-lg shadow-lg text-center relative"
        style={{ 
          backgroundColor: theme.bgColor, 
          color: theme.textColor,
          aspectRatio: '1.75',
          width: '100%',
          maxWidth: '1050px'
        }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.textColor }}>
            {card.name}
          </h1>
          <p className="text-xl" style={{ color: theme.accentColor }}>
            {card.jobTitle}
          </p>
        </div>

        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={qrCodeValue || 'Loading...'}
            size={200}
            bgColor={theme.bgColor}
            fgColor={theme.textColor}
            level="Q"
            includeMargin={true}
          />
        </div>

        <p className="text-sm" style={{ color: theme.textColor }}>
          Scan to download business card
        </p>
      </div>
    </div>
  );

  const FullCard = () => (
    <div className="w-full max-w-md mx-auto">
      <div
        ref={fullCardRef}
        data-preview-card
        className="p-8 rounded-lg shadow-lg"
        style={{ 
          backgroundColor: theme.bgColor, 
          color: theme.textColor,
          aspectRatio: '1.75',
          width: '100%',
          maxWidth: '1050px'
        }}
      >
        <div className="flex items-center space-x-6 mb-6">
          {card.profileImage && (
            <img
              src={card.profileImage}
              alt={card.name}
              className="w-24 h-24 rounded-full object-cover"
              crossOrigin="anonymous"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: theme.textColor }}>
              {card.name}
            </h1>
            <p className="text-xl mb-1" style={{ color: theme.accentColor }}>
              {card.jobTitle}
            </p>
            <p className="text-lg" style={{ color: theme.textColor }}>
              {card.company}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {card.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" style={{ color: theme.accentColor }} />
              <span>{card.email}</span>
            </div>
          )}

          {card.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" style={{ color: theme.accentColor }} />
              <span>{card.phone}</span>
            </div>
          )}

          {card.website && (
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" style={{ color: theme.accentColor }} />
              <a
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: theme.accentColor }}
              >
                {card.website}
              </a>
            </div>
          )}

          <div className="flex justify-center space-x-4 mt-4">
            {card.linkedin && (
              <a href={card.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" style={{ color: theme.accentColor }} />
              </a>
            )}
            {card.twitter && (
              <a href={card.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6" style={{ color: theme.accentColor }} />
              </a>
            )}
            {card.github && (
              <a href={card.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6" style={{ color: theme.accentColor }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div ref={previewRef}>{mode === 'qr' ? <QRCard /> : <FullCard />}</div>
      <button
        onClick={handleDownload}
        className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        <span>Download {mode === 'qr' ? 'QR Card' : 'Business Card'}</span>
      </button>
    </div>
  );
}