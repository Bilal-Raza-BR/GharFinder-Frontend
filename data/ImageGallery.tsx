import Image from 'next/image';

export const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
      <div className="col-span-4 md:col-span-2 row-span-2 relative">
        <Image 
          src={images[0]} 
          alt="Main Property" 
          fill 
          className="object-cover hover:scale-105 transition-transform duration-500" 
        />
      </div>
      {images.slice(1, 5).map((img, idx) => (
        <div key={idx} className="hidden md:block relative">
          <Image 
            src={img} 
            alt={`Room ${idx + 1}`} 
            fill 
            className="object-cover hover:opacity-90 transition-opacity cursor-pointer" 
          />
        </div>
      ))}
    </div>
  );
};