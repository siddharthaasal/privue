"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  image?: string;
  status?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset ?? 10;
  const SCALE_FACTOR = scaleFactor ?? 0.06;

  const [cards, setCards] = useState<Card[]>(items);
  const mountedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  // update internal cards if items prop changes
  useEffect(() => {
    if (!mountedRef.current) {
      setCards(items);
      mountedRef.current = true;
      return;
    }
    setCards(items);
  }, [items]);

  useEffect(() => {
    startFlipping();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFlipping = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCards((prevCards: Card[]) => {
        if (!prevCards || prevCards.length <= 1) return prevCards;
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000) as unknown as number;
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        const top = index * -CARD_OFFSET;
        const scale = 1 - index * SCALE_FACTOR;
        const zIndex = cards.length - index;

        return (
          <motion.div
            key={card.id}
            className="absolute rounded-3xl border border-neutral-200 dark:border-white/[0.06] shadow-xl dark:shadow-white/[0.03] bg-white dark:bg-black overflow-hidden flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
              width: "100%",
              height: "100%",
              zIndex,
              boxSizing: "border-box",
            }}
            animate={{
              top,
              scale,
            }}
          >
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="font-normal text-neutral-700 dark:text-neutral-200">
                {card.content}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 font-medium dark:text-white">{card.name}</p>
                  <p className="text-neutral-400 font-normal dark:text-neutral-200 text-sm">{card.designation}</p>
                </div>
              </div>
            </div>
            {/* IMAGE WRAPPER: explicit overflow-hidden + rounded top so image is clipped */}
            <div
              className="rounded-xl overflow-hidden w-full h-60 bg-center bg-cover"
              style={{ backgroundImage: `url(${card.image})` }}
            />




            {/* Body content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="mt-4 flex items-center justify-between">
                {/* Status pill */}
                <div>
                  {card.status ? (
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${card.status.toLowerCase().includes("verif")
                        ? "bg-green-50 text-green-700"
                        : card.status.toLowerCase().includes("upload")
                          ? "bg-amber-50 text-amber-700"
                          : card.status.toLowerCase().includes("submit")
                            ? "bg-sky-50 text-sky-700"
                            : "bg-gray-100 text-slate-700"
                        }`}
                    >
                      {card.status}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div >
  );
};
