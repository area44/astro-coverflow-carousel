import { motion } from "motion/react";
import { useState } from "react";

const IMAGES_DATA = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1713782894016-01154435f4f4",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1713782522146-3ac703ab3bce",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1713783540689-0ec1a2c272d9",
  },
];

export default function Carousel() {
  const [images, setImages] = useState(IMAGES_DATA);

  const handleMove = (direction: number) => {
    const imgArrCopy = [...images];

    if (direction > 0) {
      const firstItem = imgArrCopy.shift();
      if (!firstItem) return;
      imgArrCopy.push(firstItem);
    } else {
      const lastItem = imgArrCopy.pop();
      if (!lastItem) return;
      imgArrCopy.unshift(lastItem);
    }

    setImages(imgArrCopy);
  };

  const variants = {
    active: {
      x: "calc(-50% + 0px)",
      width: "22rem",
      scale: 1.1,
      opacity: 1,
    },
    level1: (position: number) => ({
      x: `calc(-50% + ${position * 240}px)`,
      width: "3rem",
      scale: 0.9,
      opacity: 1,
    }),
    level2: (position: number) => ({
      x: `calc(-50% + ${position * 145}px)`,
      width: "2rem",
      scale: 0.75,
      opacity: 1,
    }),
    level3: (position: number) => ({
      x: `calc(-50% + ${position * 108}px)`,
      width: "1.5rem",
      scale: 0.5,
      opacity: 1,
    }),
    level4: (position: number) => ({
      x: `calc(-50% + ${position * 90}px)`,
      width: 0,
      scale: 0.25,
      opacity: 0,
    }),
  };

  const getLevel = (pos: number) => {
    if (pos === 0) return "active";
    if (Math.abs(pos) === 1) return "level1";
    if (Math.abs(pos) === 2) return "level2";
    if (Math.abs(pos) === 3) return "level3";
    return "level4";
  };

  return (
    <div className="relative mx-auto flex h-96 w-[90%] items-center justify-center">
      {images.map((image, i) => {
        const centerIndex = Math.floor(images.length / 2);
        const position = i - centerIndex;
        const imgLevel = getLevel(position);

        return (
          <motion.div
            key={image.id}
            initial={false}
            className="absolute left-1/2 aspect-[3/2] h-60 flex-none overflow-hidden rounded-3xl border border-neutral-200 shadow-md dark:border-neutral-700"
            animate={imgLevel}
            custom={position}
            variants={variants}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <img
              src={image.src}
              className="h-full w-full object-cover"
              alt={`Pic ${i + 1}`}
            />
          </motion.div>
        );
      })}

      <button
        type="button"
        onClick={() => handleMove(-1)}
        className="absolute -left-6 grid h-14 w-14 place-content-center text-3xl transition-colors hover:text-accent-foreground"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => handleMove(1)}
        className="absolute -right-6 grid h-14 w-14 place-content-center text-3xl transition-colors hover:text-accent-foreground"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
