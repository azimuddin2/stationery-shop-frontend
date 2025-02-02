import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const images: string[] = [
  'https://i.ibb.co.com/hJgg0wqJ/educational5.jpg',
  'https://i.ibb.co.com/sJPScmx4/educational6.jpg',
  'https://i.ibb.co.com/MxtX0w27/educational4.jpg',
  'https://i.ibb.co.com/SDF0TfZh/educational3.jpg',
  'https://i.ibb.co.com/qYKdhxDV/educational2.jpg',
  'https://i.ibb.co.com/WvVP2r8f/educational1.jpg',
  'https://i.ibb.co.com/3YrSgCtf/art-supplies6.jpg',
  'https://i.ibb.co.com/1fw6s2Vz/art-supplies5.jpg',
  'https://i.ibb.co.com/6RsjgjHZ/art-supplies3.jpg',
  'https://i.ibb.co.com/bgqyxhWq/art-supplies4.jpg',
  'https://i.ibb.co.com/B5JVcJKb/art-supplies2.jpg',
  'https://i.ibb.co.com/9mLfDCS4/office-supplies5.jpg',
  'https://i.ibb.co.com/4cfcsDK/office-supplies4.jpg',
  'https://i.ibb.co.com/MDsmKXd8/office-supplies2.jpg',
  'https://i.ibb.co.com/3ZSfRsq/office-supplies1.jpg',
  'https://i.ibb.co.com/rRGvLjjF/writing5.jpg',
  'https://i.ibb.co.com/qY3xvQrt/writing6.jpg',
  'https://i.ibb.co.com/5HVZWBY/writing4.jpg',
  'https://i.ibb.co.com/q3BgNn0t/writing3.jpg',
  'https://i.ibb.co.com/qYKygqNq/writing2.jpg',
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-secondary">
        Image Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {images.map((image, index) => (
          <motion.div key={index} className="break-inside-avoid">
            <motion.img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full rounded-sm cursor-pointer shadow-lg hover:scale-105 transition-transform"
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="relative p-4 max-w-3xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <img
              src={selectedImage}
              alt="Enlarged"
              className="rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ImageGallery;
