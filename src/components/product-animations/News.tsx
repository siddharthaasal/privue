import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

const TYPED_QUERY = 'Entity sustainability news';

// SearchFrame.tsx
function SearchFrame() {
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const caretRef = useRef<number | null>(null);

  useEffect(() => {
    // start typewriter after mount
    setTyping(true);
    const speed = 55; // ms per char (type speed)
    const startDelay = 420; // small delay before starting
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        for (let i = 0; i < TYPED_QUERY.length; i++) {
          timers.push(
            window.setTimeout(() => {
              setValue((v) => TYPED_QUERY.slice(0, v.length + 1));
            }, i * speed),
          );
        }

        // finish typing: stop caret, simulate submit after short pause
        timers.push(
          window.setTimeout(
            () => {
              setTyping(false);
              // simulate clicking submit
              setTimeout(() => {
                triggerSubmit();
              }, 330);
            },
            TYPED_QUERY.length * speed + 140,
          ),
        );
      }, startDelay),
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    // synthetic caret blink (if typing)
    if (!typing) return;
    let visible = true;
    caretRef.current = window.setInterval(() => {
      visible = !visible;
      if (inputRef.current) {
        // manually update placeholder-like caret using CSS variable or value append
        // but we simply rely on typed value + '|' suffix render in input
        // No-op here — caret rendering handled in JSX
      }
    }, 550);
    return () => {
      if (caretRef.current) clearInterval(caretRef.current);
    };
  }, [typing]);

  const triggerSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    setLoading(true);

    // simulate a quick press animation + fake network load
    setTimeout(() => {
      setLoading(false);
      // optionally show a short 'done' flash, then reset submit state
      setTimeout(() => setSubmitted(false), 700);
    }, 900);
  };

  return (
    <div className="w-[400px] max-w-[500px] rounded-md bg-gray-50 p-3">
      <div className="mb-3 text-[11px] font-medium text-slate-800">News API</div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only text-[10px]">
            Search query
          </label>

          <div
            className="relative rounded-md border border-slate-200 shadow-sm focus-within:border-slate-300"
            style={{ background: 'white' }}
          >
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
              {/* search icon (simple svg) */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* input */}
            <input
              id="search"
              ref={inputRef}
              value={typing ? `${value}|` : value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent py-2 pr-4 pl-7 text-[9px] leading-snug outline-none"
              placeholder="Search"
              aria-label="Search query"
              readOnly={typing} // while auto-typing, keep readOnly to avoid interference
            />
          </div>
        </div>

        {/* animated submit button */}
        <motion.button
          onClick={() => {
            // allow manual click even if typing finished
            triggerSubmit();
          }}
          whileTap={{ scale: 0.96 }}
          animate={submitted ? { scale: [1, 0.98, 1] } : { scale: 1 }}
          transition={{ duration: 0.28 }}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1 text-[9px] font-medium text-white shadow-sm"
          aria-pressed={submitted}
        >
          {loading ? (
            // tiny spinner
            <svg className="mr-2 -ml-1 animate-spin" width="16" height="16" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.2"
                fill="none"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : null}
          <span className="select-none">{loading ? 'Searching...' : 'Search'}</span>
        </motion.button>
      </div>
    </div>
  );
}

// JsonNewsFrame.tsx

/**
 * JsonNewsFrame
 * - shows a JSON-like payload as a compact, minimally-styled "raw" view
 * - min-w 400px, max-w 500px
 * - small monospace font, low line-height to make it intentionally dense
 * - staggered per-line reveal using framer-motion
 */

const rawPayload = [
  {
    classification: {
      main_category: 'medtop:02000000',
      main_category_title: 'Crime, Law, and Justice',
      // subcategory: "medtop:2000012",
      // subcategory_title: "Litigation",
      // confidence: "High",
      reasoning:
        "The news cluster primarily focuses on a legal proceeding where the Chhattisgarh High Court refused to quash an FIR. This directly relates to the judicial process and legal action taken by the petitioners, fitting perfectly under 'Crime, Law, and Justice' as the main category and 'Litigation' as the specific subcategory.",
    },
    extracted_details: {
      event:
        'Chhattisgarh High Court refuses to quash an FIR filed against employees of a logistics firm (ElasticRun) for delivering prohibited knives, which were subsequently used in a murder.',
      event_type: 'Legal Ruling',
      location: 'Raipur, Chhattisgarh, India',
      key_entities: [
        {
          entity: 'Chhattisgarh High Court',
          role: 'Authority',
          action: 'Refused to quash the FIR against ElasticRun employees.',
          business_impact: [],
        },
      ],
    },
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.06,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
};

// keep your containerVariants and cardVariants definitions above (unchanged)

function JsonNewsFrame({ payload = rawPayload }: { payload?: unknown }) {
  const txt = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
  const lines = useMemo(() => txt.split('\n'), [txt]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-[460px] min-w-[360px] rounded-md bg-white/95 p-2 ring-1 ring-slate-100 shadow-sm"
    >
      <div className="mb-1 text-[11px] font-semibold text-slate-800">
        Raw News Payload
      </div>

      <div
        className="overflow-auto rounded-sm bg-slate-50"
        style={{ maxHeight: 280, border: '1px solid rgba(15,23,42,0.06)' }}
      >
        <div className="px-2 py-1.5">
          <motion.pre
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="m-0 font-mono text-[10px] text-slate-700 whitespace-pre"
            style={{ lineHeight: 1.25 }}
          >
            {lines.map((ln, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className="overflow-hidden"
                aria-hidden
                style={{ margin: 0, padding: 0 }}
              >
                <code
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: 'rgba(30,41,59,0.9)',
                    whiteSpace: 'pre',
                  }}
                >
                  {ln}
                </code>
              </motion.div>
            ))}
          </motion.pre>
        </div>
      </div>
    </motion.div>
  );
}

const defaultPayload = [
  {
    "classification": {
      "main_category": "medtop:02000000",
      "main_category_title": "Crime, Law, and Justice",
      "subcategory": "medtop:20000112",
      "subcategory_title": "Litigation",
      "confidence": "High",
      "reasoning": "The news cluster primarily focuses on a legal proceeding where the Chhattisgarh High Court refused to quash an FIR. This directly relates to the judicial process and legal action taken by the petitioners, fitting perfectly under 'Crime, Law, and Justice' as the main category and 'Litigation' as the specific subcategory."
    },
    "extracted_details": {
      "event": "Chhattisgarh High Court refuses to quash an FIR filed against employees of a logistics firm (ElasticRun) for delivering prohibited knives, which were subsequently used in a murder.",
      "event_type": "Legal Ruling",
      "location": "Raipur, Chhattisgarh, India",
      "key_entities": [
        {
          "entity": "Chhattisgarh High Court",
          "role": "Authority",
          "action": "Refused to quash the FIR against ElasticRun employees.",
          "business_impact": []
        },
        {
          "entity": "ElasticRun",
          "role": "Service Provider",
          "action": "Delivered prohibited knives ordered via an e-commerce platform, leading to an FIR against its employees.",
          "business_impact": [
            {
              "category": "Legal Exposure",
              "impact": "Negative",
              "reason": "Employees are facing an FIR, and the court has refused to quash it, indicating potential legal liabilities for the company and its personnel."
            },
            {
              "category": "Reputation",
              "impact": "Negative",
              "reason": "The company is associated with the delivery of weapons used in a murder, and police warnings were issued prior, potentially damaging its public image and trustworthiness."
            },
            {
              "category": "Compliance and Regulations",
              "impact": "Negative",
              "reason": "The delivery of prohibited items, despite police warnings, suggests a potential failure in adhering to regulations, specifically the Arms Act."
            }
          ]
        },
        {
          "entity": "Flipkart",
          "role": "E-commerce company",
          "action": "Facilitated the online order of prohibited knives that were later used in a murder.",
          "business_impact": [
            {
              "category": "Reputation",
              "impact": "Negative",
              "reason": "The company is implicated in facilitating the purchase of murder weapons, which can severely harm its brand image and customer trust."
            },
            {
              "category": "Compliance and Regulations",
              "impact": "Negative",
              "reason": "The platform allowed the sale of prohibited items despite police warnings, indicating potential regulatory non-compliance."
            },
            {
              "category": "Legal Exposure",
              "impact": "Negative",
              "reason": "Although not directly named in this specific FIR, its role in the transaction could lead to future legal scrutiny or actions."
            }
          ]
        },
        {
          "entity": "Police Authorities",
          "role": "Authority",
          "action": "Issued prior warnings to e-commerce platforms and filed an FIR against ElasticRun employees.",
          "business_impact": []
        }
      ],
      "key_persons": [
        {
          "name": "Dinesh Kumar Sahu",
          "role": "Employee (ElasticRun)"
        },
        {
          "name": "Harishankar Sahu",
          "role": "Employee (ElasticRun)"
        },
        {
          "name": "Chief Justice Ramesh Sinha",
          "role": "Judge"
        },
        {
          "name": "Justice Bibhu Datta Guru",
          "role": "Judge"
        },
        {
          "name": "Sameer Tondon",
          "role": "Accused (murderer)"
        },
        {
          "name": "Kunal Tiwari",
          "role": "Accused (murderer, ordered knives)"
        }
      ],
      "key_information": "The FIR against ElasticRun employees Dinesh Kumar Sahu and Harishankar Sahu alleges negligent conduct in delivering knives, prohibited under the Arms Act, which were ordered via Flipkart and used in a murder. The High Court noted that police had previously warned e-commerce platforms about such items and stated that the employees' knowledge, negligence, and safe-harbour protections require further investigation.",
      "additional_info": "The murder and robbery occurred on July 17, 2025. The petitioners argued that contractual obligations prevented them from inspecting package contents. The FIR was filed under relevant sections of the Bharatiya Nyaya Sanhita (BNS)."
    }
  },
  {
    "classification": {
      "main_category": "medtop:04000000",
      "main_category_title": "Economy, Business, and Finance",
      "subcategory": "medtop:20000204",
      "subcategory_title": "Merger or Acquisition",
      "confidence": "High",
      "reasoning": "The news cluster primarily details Flipkart's acquisition of a majority stake in Pinkvilla India, a clear business transaction falling under the 'Economy, Business, and Finance' main category and specifically the 'Merger or Acquisition' subcategory."
    },
    "extracted_details": {
      "event": "Flipkart acquired a majority stake in Pinkvilla India, a digital infotainment platform.",
      "event_type": "Acquisition",
      "location": "India",
      "key_entities": [
        {
          "entity": "Flipkart",
          "role": "Acquirer",
          "action": "Acquired a majority stake (over 75%) in Pinkvilla India for an undisclosed sum, estimated around $15 million, to expand content reach and engage Gen Z and millennial audiences.",
          "business_impact": [
            {
              "category": "Market Expansion",
              "impact": "Positive",
              "reason": "The acquisition allows Flipkart to broaden its content offerings and appeal to new demographics, strengthening its position in the Indian e-commerce market."
            },
            {
              "category": "Customer Base",
              "impact": "Positive",
              "reason": "Leveraging Pinkvilla's loyal audience base is expected to attract more Gen Z and millennial users to Flipkart's ecosystem."
            },
            {
              "category": "Competitiveness",
              "impact": "Positive",
              "reason": "This strategic move helps Flipkart compete more effectively with rivals like Amazon and Nykaa, who also use content to drive engagement."
            },
            {
              "category": "Revenue Diversification",
              "impact": "Positive",
              "reason": "Integrating content-led commerce opportunities through Pinkvilla can create new revenue streams for Flipkart."
            }
          ]
        },
        {
          "entity": "Pinkvilla India",
          "role": "Target (Acquisition)",
          "action": "Was acquired by Flipkart, receiving investment and support to scale operations and strengthen its position in digital entertainment.",
          "business_impact": [
            {
              "category": "Financial Stability",
              "impact": "Positive",
              "reason": "The acquisition provides Pinkvilla with financial backing and resources from Flipkart, enabling it to scale operations despite previous net losses."
            },
            {
              "category": "Market Expansion",
              "impact": "Positive",
              "reason": "With Flipkart's support, Pinkvilla can further strengthen its position as a leader in infotainment and potentially expand its reach."
            },
            {
              "category": "Brand Equity",
              "impact": "Positive",
              "reason": "The association with Flipkart, a major e-commerce player, can enhance Pinkvilla's brand recognition and credibility."
            }
          ]
        },
        {
          "entity": "Amazon",
          "role": "Competitor",
          "action": "Maintains a significant presence in the content sector through Amazon Prime, serving as a benchmark for Flipkart's content strategy.",
          "business_impact": [
            {
              "category": "Competitiveness",
              "impact": "Neutral",
              "reason": "Flipkart's acquisition of Pinkvilla intensifies competition in the content-driven e-commerce space, potentially impacting Amazon's market share or requiring further strategic responses."
            }
          ]
        },
        {
          "entity": "Myntra",
          "role": "Corporate Partner",
          "action": "Launched Glamstream, a shoppable video platform, as part of Flipkart's broader content strategy.",
          "business_impact": [
            {
              "category": "Innovation",
              "impact": "Positive",
              "reason": "Glamstream represents an innovative approach to integrate content and commerce, enhancing customer engagement and sales for Myntra."
            }
          ]
        },
        {
          "entity": "Nykaa",
          "role": "Competitor",
          "action": "Has built a multi-channel content strategy with Nykaa TV, Beauty Book blogs, and influencer programs.",
          "business_impact": [
            {
              "category": "Competitiveness",
              "impact": "Neutral",
              "reason": "Flipkart's move into content through Pinkvilla increases competitive pressure on Nykaa, which already has an established content strategy."
            }
          ]
        }
      ],
      "key_persons": [
        {
          "name": "Ravi Iyer",
          "role": "Senior Vice President, Corporate, Flipkart"
        },
        {
          "name": "Nandini Shenoy",
          "role": "Founder and CEO, Pinkvilla"
        }
      ],
      "key_information": "Flipkart acquired a majority stake (likely over 75%) in Pinkvilla India, valuing the digital infotainment platform at approximately $15 million. This strategic move aims to enhance Flipkart's content offerings, deepen engagement with Gen Z and millennial audiences, and leverage celebrity-driven infotainment to drive e-commerce growth. Pinkvilla will continue to operate under its own brand while integrating with Flipkart's ecosystem.",
      "additional_info": "Pinkvilla, founded in 2007, boasts millions of users and 7.2 million Instagram followers. In FY24, it reported INR 15.2 Cr in operating revenue with a net loss of INR 1.4 Cr. Flipkart recently raised ₹2,225 crore in internal funding and has invested in 20 startups through Flipkart Ventures. Flipkart also launched 'Flipkart Black' as a subscription service to compete with Amazon Prime."
    }
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

export function JsonCardsFrame({ payload = defaultPayload }: { payload?: any }) {
  // normalize payload -> array of items
  const items = useMemo(() => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.cases)) return payload.cases;
    if (Array.isArray(payload.items)) return payload.items;
    // single object -> wrap it
    if (typeof payload === 'object') return [payload];
    return [];
  }, [payload]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-[450px] min-w-[360px] rounded-md border bg-white/90 p-4"
      aria-label="Minimal cases frame"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-900">
          {typeof payload === 'object' && payload?.company ? payload.company : 'News'}
        </div>
        <div className="text-[9px] text-slate-500">{items.length} item{items.length !== 1 ? 's' : ''}</div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {items.map((it: any, i: number) => {
          const cls = it.classification ?? {};
          const ex = it.extracted_details ?? it.extractedDetails ?? {};
          const category = cls.main_category_title ?? cls.main_category ?? 'Unknown category';
          const sub = cls.subcategory_title ?? cls.subcategory;
          const confidence = cls.confidence;
          const eventType = ex.event_type ?? 'Event';
          const location = ex.location;
          const eventExcerpt = (ex.event ?? '').slice(0, 160);
          const entities: string[] =
            Array.isArray(ex.key_entities) && ex.key_entities.length
              ? ex.key_entities.map((k: any) => k.entity).filter(Boolean)
              : [];

          // indicator if any entity lists business_impact
          const hasBusinessImpact =
            Array.isArray(ex.key_entities) &&
            ex.key_entities.some((k: any) => Array.isArray(k.business_impact) && k.business_impact.length > 0);

          return (
            <motion.article
              key={it.id ?? it.caseNumber ?? `item-${i}`}
              variants={cardVariants}
              className="rounded-md border border-slate-100 bg-white p-2 shadow-sm"
              style={{ fontSize: 11 }}
            >
              {/* header: category / subcategory + confidence */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[10px] font-medium text-slate-800" title={category}>
                    {category}
                    {sub ? (
                      <span className="ml-1 text-[9px] text-slate-500">· {sub}</span>
                    ) : null}
                  </div>

                  {confidence ? (
                    <div className="mt-1 text-[9px] text-slate-500">{confidence}</div>
                  ) : null}
                </div>

                {/* small event-type badge */}
                <div className="ml-2 shrink-0">
                  <div className="rounded-full px-2 py-[4px] text-[8px] font-medium border border-slate-100 bg-slate-50 text-slate-700">
                    {eventType}
                  </div>
                </div>
              </div>

              {/* location + small excerpt */}
              <div className="mt-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  {location ? (
                    <div className="text-[9px] text-slate-500 truncate" title={location}>
                      {location}
                    </div>
                  ) : null}

                  <div
                    className="mt-1 text-[9px] text-slate-700"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.15,
                    }}
                    title={ex.event}
                  >
                    {eventExcerpt}
                    {ex.event && ex.event.length > eventExcerpt.length ? '…' : ''}
                  </div>
                </div>

                {/* tiny icon if business impact exists */}
                {hasBusinessImpact ? (
                  <div className="ml-2 flex-shrink-0 text-[9px] text-rose-600" title="Business impact noted">
                    ⚠
                  </div>
                ) : null}
              </div>

              {/* condensed entities row */}
              {entities.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  {entities.slice(0, 2).map((n, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-slate-100 bg-slate-50 px-2 py-[3px] text-[9px] text-slate-700"
                      title={n}
                    >
                      {n}
                    </span>
                  ))}

                  {entities.length > 2 && (
                    <span className="text-[9px] text-slate-400">+{entities.length - 2} more</span>
                  )}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}



export default function News() {
  const bgUrl = '/module-animations/climate-risk-bg.png';

  type Step = 'frame1' | 'frame2' | 'frame3';
  const [step, setStep] = useState<Step>('frame1');

  // durations (ms) per frame — tweak as needed
  const durations: Record<Step, number> = {
    frame1: 3500,
    frame2: 4000,
    frame3: 4000,
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStep((prev) => {
        if (prev === 'frame1') return 'frame2';
        if (prev === 'frame2') return 'frame3';
        return 'frame1';
      });
    }, durations[step]);

    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
      {/* background layer */}
      <div className="absolute inset-0">
        <img
          src={bgUrl}
          alt="background"
          className="h-full w-full object-cover backdrop-opacity-95"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.7) 100%)',
          }}
        />
      </div>

      {/* overlay frames */}
      <AnimatePresence>
        {step === 'frame1' && (
          <motion.div key="frame1" className="absolute right-6 bottom-6">
            <SearchFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame2' && (
          <motion.div key="frame2" className="absolute right-6 bottom-6">
            <JsonNewsFrame />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 'frame3' && (
          <motion.div key="frame3" className="absolute right-6 bottom-6">
            <JsonCardsFrame />
          </motion.div>
        )}
      </AnimatePresence>



      {/* Optional tiny controls for testing — remove if you want purely automatic cycling */}
      {/* <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame3" : s === "frame2" ? "frame1" : "frame2"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Prev frame"
                >
                    Prev
                </button>
                <button
                    onClick={() => setStep((s) => (s === "frame1" ? "frame2" : s === "frame2" ? "frame3" : "frame1"))}
                    className="text-xs px-2 py-1 rounded bg-white/80 shadow-sm"
                    aria-label="Next frame"
                >
                    Next
                </button>
            </div> */}
    </div>
  );
}
