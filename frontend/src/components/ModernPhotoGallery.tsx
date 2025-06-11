import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Photo {
  id: number;
  title: string;
  url: string;
  category: string;
  createdAt: string;
}

interface ModernPhotoGalleryProps {
  photos: Photo[];
  selectedCategory?: string;
}

const ModernPhotoGallery: React.FC<ModernPhotoGalleryProps> = ({ photos, selectedCategory = 'all' }) => {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">📸</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Фото поки що немає
        </h3>
        <p className="text-gray-500 text-lg">Незабаром тут з'являться нові фотографії!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          onMouseEnter={() => setHoveredPhoto(photo.id)}
          onMouseLeave={() => setHoveredPhoto(null)}
          whileHover={{ scale: 1.03 }}
        >
          {/* Football effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-3 left-3 text-2xl animate-bounce">⚽</div>
            <div className="absolute bottom-3 right-3 text-lg animate-spin">🏆</div>
          </div>

          {/* Photo */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={photo.url.startsWith('/uploads/') ? `http://localhost:3001${photo.url}` : photo.url}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Photo info */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="bg-nika-blue/10 text-nika-blue px-3 py-1 rounded-full font-medium">
                {photo.category}
              </span>
              <span>{new Date(photo.createdAt).toLocaleDateString('uk-UA')}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernPhotoGallery; 