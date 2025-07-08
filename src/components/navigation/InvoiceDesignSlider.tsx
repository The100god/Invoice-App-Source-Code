"use client";

import { useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { invoiceBillSelectAtom } from "../../variables/electricalInvoiceVariable";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
};

const InvoiceDesignSlider = ({
  activeTabIndex,
}: {
  activeTabIndex: number;
}) => {
  const [, setInvoiceBillSelect] = useAtom(invoiceBillSelectAtom);
  const [designThumbnails, setDesignThumbnails] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
const layoutKeys =["BillLayout1", "BillLayout2", "BillLayout3", "BillLayout4", "BillLayout5", "BillLayout6", "BillLayout7", "BillLayout8", "BillLayout9", "BillLayout10", "BillLayout11"];
  const updateSelection = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setInvoiceBillSelect((prev) => {
        const updated = [...prev];
        updated[activeTabIndex][activeTabIndex] = {
          ...updated[activeTabIndex],
          selectedBillInvoice: layoutKeys[index],
          selectedBillImage: designThumbnails[index],
        };
        return updated;
      });
    },
    [designThumbnails, activeTabIndex]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    updateSelection(emblaApi.selectedScrollSnap());
  }, [emblaApi, updateSelection]);

  useEffect(() => {
    window.electron.loadBillImages().then((images: string[]) => {
      const sorted = images.sort((a, b) => {
        const aNum = parseInt(a.match(/\d+/)?.[0] || "0");
        const bNum = parseInt(b.match(/\d+/)?.[0] || "0");
        return aNum - bNum;
      });
      setDesignThumbnails(sorted);
      updateSelection(2); // Select first by default
      const timeoutId = setTimeout(() => {
        emblaApi?.scrollTo(2); // Scroll to index 3 after Embla is initialized
      }, 0);

      // Cleanup on unmount or re-render
      return () => clearTimeout(timeoutId);

          // setTimeout(() => emblaApi?.scrollTo(2), 0); // Scroll to index 3 after render

    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(); // initial select
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="bg-black text-white py-6 rounded-xl mt-8 mb-4 w-full max-w-4xl mx-auto">
      <h2 className="text-center text-xl mb-4 font-semibold">
        Select Invoice Design
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Left */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 pl-3 bg-black h-full z-10"
        >
          <FaChevronLeft className="text-cyan-400 text-3xl hover:scale-110 transition" />
        </button>

        {/* Embla Carousel */}
        <div className="overflow-hidden w-full px-10" ref={emblaRef}>
          <div className="flex items-center">
            {designThumbnails.map((src, index) => {
              const total = designThumbnails.length;
              const wrappedDiff = Math.min(
                Math.abs(index - selectedIndex),
                total - Math.abs(index - selectedIndex) // handles looping wrap
              );

              // Calculate scale + opacity dynamically
              const scale = 1 - Math.min(wrappedDiff * 0.1, 0.5); // range: 1 -> 0.5
              const opacity = 1 - Math.min(wrappedDiff * 0.2, 0.6); // range: 1 -> 0.4

              return (
                <div
                  key={index}
                  className="transition-all duration-500 ease-in-out cursor-pointer"
                  style={{
                    width: "130px",
                    height: "180px",
                    flexShrink: 0,
                    marginRight: "8px",
                    transform: `scale(${scale})`,
                    opacity: opacity,
                  }}
                  onClick={() => emblaApi?.scrollTo(index)}
                >
                  <div
                    className={`rounded-lg overflow-hidden border-4 ${
                      index === selectedIndex
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Invoice ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <button
          onClick={scrollNext}
          className="absolute right-0 pr-3 bg-black h-full z-10"
        >
          <FaChevronRight className="text-cyan-400 text-3xl hover:scale-110 transition" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceDesignSlider;
