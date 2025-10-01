'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

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
            className="absolute flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl dark:border-white/[0.06] dark:bg-black dark:shadow-white/[0.03]"
            style={{
              transformOrigin: 'top center',
              width: '100%',
              height: '100%',
              zIndex,
              boxSizing: 'border-box',
            }}
            animate={{
              top,
              scale,
            }}
          >
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="font-normal text-neutral-700 dark:text-neutral-200">
                {card.content}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-500 dark:text-white">{card.name}</p>
                  <p className="text-sm font-normal text-neutral-400 dark:text-neutral-200">
                    {card.designation}
                  </p>
                </div>
              </div>
            </div>
            {/* IMAGE WRAPPER: explicit overflow-hidden + rounded top so image is clipped */}
            <div
              className="h-60 w-full overflow-hidden rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />

            {/* Body content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="mt-4 flex items-center justify-between">
                {/* Status pill */}
                <div>
                  {card.status ? (
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        card.status.toLowerCase().includes('verif')
                          ? 'bg-green-50 text-green-700'
                          : card.status.toLowerCase().includes('upload')
                            ? 'bg-amber-50 text-amber-700'
                            : card.status.toLowerCase().includes('submit')
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-gray-100 text-slate-700'
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
    </div>
  );
};
