import React, { useState, useEffect } from 'react';

interface DogStats {
  largeFiles: number;
  smallFiles: number;
  loading: boolean;
}

export function DogStats() {
  const [stats, setStats] = useState<DogStats>({
    largeFiles: 0,
    smallFiles: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchDogStats = async () => {
      let largeCount = 0;
      let smallCount = 0;
      const THRESHOLD = 1050000;
      const TOTAL_REQUESTS = 100;

      for (let i = 0; i < TOTAL_REQUESTS; i++) {
        try {
          const response = await fetch('https://random.dog/woof.json');
          const data = await response.json();
          
          if (data.fileSizeBytes > THRESHOLD) {
            largeCount++;
          } else {
            smallCount++;
          }
        } catch (error) {
          console.error('Error fetching dog data:', error);
        }
      }

      setStats({
        largeFiles: largeCount,
        smallFiles: smallCount,
        loading: false,
      });
    };

    fetchDogStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Köpek resimleri analiz ediliyor...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dosya Boyutu Analizi</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Büyük Dosyalar</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.largeFiles}</p>
          <p className="text-sm text-blue-500 mt-1">&gt; 1,050,000 bytes</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Küçük Dosyalar</h3>
          <p className="text-3xl font-bold text-green-600">{stats.smallFiles}</p>
          <p className="text-sm text-green-500 mt-1">&lt; 1,050,000 bytes</p>
        </div>
      </div>
    </div>
  );
}