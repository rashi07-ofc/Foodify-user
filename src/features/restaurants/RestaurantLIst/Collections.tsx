import React, { useRef } from "react";


interface CollectionItem {
  title: string;
  image: string;
  places: string;
}

const collections: CollectionItem[] = [
  {
    title: "Insta-worthy Spots",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    places: "31 Places",
  },
  {
    title: "Top Trending Spots",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    places: "30 Places",
  },
  {
    title: "Newly Opened Places",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    places: "42 Places",
  },
  {
    title: "Secret Speakeasy Bars",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=84",
    places: "11 Places",
  },
];

const Collections: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center w-screen py-5 px-0 md:px-[10vw] bg-white">
      <div className="flex flex-col items-start px-5 md:px-[10vw] w-full max-w-[80vw] box-border">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-2">
          <h2
            className="text-[32px] font-semibold mb-2 text-[#FF9D59] font-[Dancing Script] italic drop-shadow-lg"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Collections
          </h2>
          <a
            href="#"
            className="text-[#FF9D59] font-semibold italic hover:underline text-lg md:text-xl"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            All collections in Delhi NCR &gt;
          </a>
        </div>
        <p
          className="text-base text-[#FFAA66] mb-8 italic font-poppins"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          Explore curated lists of top restaurants, cafes, pubs, and bars in
          Delhi NCR, based on trends
        </p>

        {/* Carousel */}
        <div className="relative w-full">
          {/* Left Arrow */}
          <button
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white border-none shadow-lg w-10 h-10 rounded-full text-[22px] text-[#FF9D59] flex items-center justify-center z-20 hover:bg-[#f5f5f5] transition"
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            &#10094;
          </button>

          {/* Cards */}
          <div
            className="flex gap-5 overflow-x-hidden pb-5 scroll-smooth justify-center no-scrollbar"
            ref={scrollRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {collections.map((collection, index) => (
              <div
                key={index}
                className="flex-none w-[300px] h-[420px] rounded-xl overflow-hidden relative cursor-pointer shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    {collection.title}
                  </h3>
                  <span className="text-sm text-gray-300">
                    {collection.places}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white border-none shadow-lg w-10 h-10 rounded-full text-[22px] text-[#FF9D59] flex items-center justify-center z-20 hover:bg-[#f5f5f5] transition"
            onClick={scrollRight}
            aria-label="Scroll Right"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections;
