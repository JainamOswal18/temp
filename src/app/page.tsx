'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Search, Bell, Upload } from 'lucide-react';
import Markdown from 'react-markdown'

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  function fetchMarkdown() {
    fetch('https://arealisbackend.s3.us-east-1.amazonaws.com/ai_response/0194b2bc-16da-7b81-85aa-b27ad78569a7.txt')
      .then(response => response.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error('Error fetching markdown:', error));
  }

  useEffect(() => {
    fetchMarkdown()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white flex items-center justify-between px-6 py-4 border-b">
        <div className="text-[#246BFD] font-semibold text-lg">Arealis</div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search here"
              className="pl-10 pr-4 py-1.5 rounded-lg border text-sm w-[200px] focus:outline-none focus:border-[#246BFD]"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            U
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[200px] h-[calc(100vh-65px)] bg-white border-r p-4">
          <nav className="space-y-2">
            {[
              { name: 'Home', icon: '🏠' },
              { name: 'Search', icon: '🔍' },
              { name: 'Analytics', icon: '📊' },
              { name: 'Ingestion', icon: '📥' },
              { name: 'AI Models', icon: '🤖' },
              { name: 'Storage & Maintenance', icon: '💾' },
              { name: 'Integration', icon: '🔄' },
              { name: 'Settings', icon: '⚙' },
            ].map((item) => (
              <button
                key={item.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm w-full text-left"
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#246BFD] mb-2">
                Data Ingestion Portal
              </h1>
              <p className="text-gray-500">
                Upload and manage your datasets securely
              </p>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-lg border-2 border-dashed border-[#246BFD] p-12 mb-8">
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-[#246BFD] mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload files</h3>
                <p className="text-gray-500 mb-4">
                  Drag or drop your files here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <label
                  htmlFor="file-upload"
                  className="bg-[#246BFD] text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {file && (
              <p className="mt-2 text-sm text-gray-600 mb-4">
                Selected file: {file.name}
              </p>
            )}

            {/* Data Sources */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Data Sources</h2>
                <button className="bg-[#246BFD] text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  + Connect Data Source
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    title: 'Databases',
                    description:
                      'Connect to SQL Server, PostgreSQL including MySQL, MongoDB and more',
                  },
                  {
                    title: 'Cloud Storage',
                    description:
                      'Import from AWS S3, Google Drive, Dropbox and more',
                  },
                  {
                    title: 'Streaming',
                    description:
                      'Connect to Kafka, RabbitMQ and other streaming platforms',
                  },
                ].map((source) => (
                  <div
                    key={source.title}
                    className="bg-white border rounded-lg p-4"
                  >
                    <h3 className="font-medium mb-2">{source.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {source.description}
                    </p>
                    <button className="w-full border rounded-lg py-2 hover:bg-gray-50">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {markdown && (
            <Markdown>{markdown}</Markdown>
          )}
        </main>

        
      </div>
    </div>
  );
}