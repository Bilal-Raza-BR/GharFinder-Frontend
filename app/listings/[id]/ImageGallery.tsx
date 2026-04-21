import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop"
];

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-96 md:h-[500px] rounded-[2rem] overflow-hidden bg-surface-container-high">
        <img
          src={displayImages[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {selectedImage + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-outline-variant hover:border-primary/50'
              }`}
            >
              <img
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}