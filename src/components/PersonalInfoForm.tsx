import React from 'react';
import { UserCircle, Mail, Phone, Globe, Building2, FileText } from 'lucide-react';
import type { PersonalInfo } from '../types';

interface PersonalInfoFormProps {
  info: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

export function PersonalInfoForm({ info, onChange }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...info, [name]: value });
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <UserCircle className="w-5 h-5" />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <FileText className="w-5 h-5" />
          <span>Title</span>
        </label>
        <input
          type="text"
          name="title"
          value={info.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Software Engineer"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <Mail className="w-5 h-5" />
          <span>Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <Phone className="w-5 h-5" />
          <span>Phone</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={info.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+1 234 567 8900"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <Globe className="w-5 h-5" />
          <span>Website</span>
        </label>
        <input
          type="url"
          name="website"
          value={info.website}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <Building2 className="w-5 h-5" />
          <span>Company</span>
        </label>
        <input
          type="text"
          name="company"
          value={info.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Company Name"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <UserCircle className="w-5 h-5" />
          <span>About</span>
        </label>
        <textarea
          name="about"
          value={info.about}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="A brief description about yourself"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-700">
          <UserCircle className="w-5 h-5" />
          <span>Avatar URL</span>
        </label>
        <input
          type="url"
          name="avatar"
          value={info.avatar}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
    </div>
  );
}