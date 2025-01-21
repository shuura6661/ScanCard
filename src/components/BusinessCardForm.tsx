import React, { useRef } from 'react';
import { BusinessCard } from '../types';
import { Mail, Phone, Globe, Linkedin, Twitter, Github, Upload } from 'lucide-react';

interface BusinessCardFormProps {
  card: BusinessCard;
  onChange: (card: BusinessCard) => void;
  darkMode: boolean;
}

export default function BusinessCardForm({ card, onChange, darkMode }: BusinessCardFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...card, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...card, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClassName = `mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  }`;

  const labelClassName = `block text-sm font-medium ${
    darkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <div className={`space-y-4 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md transition-colors duration-200`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Personal Information</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {card.profileImage ? (
              <img src={card.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Image
            </button>
            <input
              type="url"
              name="profileImage"
              value={card.profileImage || ''}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Image URL"
            />
          </div>
        </div>

        <div>
          <label className={labelClassName}>Full Name</label>
          <input
            type="text"
            name="name"
            value={card.name}
            onChange={handleChange}
            className={inputClassName}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className={labelClassName}>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={card.jobTitle}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label className={labelClassName}>Company</label>
          <input
            type="text"
            name="company"
            value={card.company}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Tech Corp"
          />
        </div>

        <div>
          <label className={labelClassName}>Personal Description</label>
          <textarea
            name="description"
            value={card.description}
            onChange={handleChange}
            className={`${inputClassName} h-24 resize-none`}
            placeholder="A brief description about yourself and your expertise..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="email"
            name="email"
            value={card.email}
            onChange={handleChange}
            className={inputClassName}
            placeholder="john@example.com"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Phone className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="tel"
            name="phone"
            value={card.phone}
            onChange={handleChange}
            className={inputClassName}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Globe className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="url"
            name="website"
            value={card.website}
            onChange={handleChange}
            className={inputClassName}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Linkedin className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="url"
            name="linkedin"
            value={card.linkedin}
            onChange={handleChange}
            className={inputClassName}
            placeholder="LinkedIn URL"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Twitter className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="url"
            name="twitter"
            value={card.twitter}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Twitter URL"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Github className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="url"
            name="github"
            value={card.github}
            onChange={handleChange}
            className={inputClassName}
            placeholder="GitHub URL"
          />
        </div>
      </div>
    </div>
  );
}