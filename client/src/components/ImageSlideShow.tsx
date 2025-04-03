import { useState } from "react";

type ImageSlideshowProps = {
    images: string[];
    initialIndex: number;
    onClose: () => void;
};

const ImageSlideshow = ({ images, initialIndex, onClose }: ImageSlideshowProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-3xl font-bold"
                >
                    &times;
                </button>
                <img
                    src={images[currentIndex]}
                    alt={`Project image ${currentIndex + 1}`}
                    className="max-w-full min-w-screen max-h-screen rounded"
                />
                <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                >
                    &larr;
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl"
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default ImageSlideshow;