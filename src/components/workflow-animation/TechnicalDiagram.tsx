import { motion } from 'framer-motion';

const nodes = [
  { name: 'Alpha Energy', x: 50, y: 10 },
  { name: 'Beta Company', x: 140, y: 30 },
  { name: 'Gamma Power', x: 140, y: 105 },
  { name: 'Delta Resources', x: 40, y: 150 },
];

export default function TechnicalDiagram() {
  return (
    <div className="relative mx-auto h-[150px] w-[200px] bg-transparent">
      {/* Center node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-[8px] font-bold"
      >
        <div className="bg-privue-100 text-privue-800 rounded-md p-1 px-2">Director Kumar</div>
      </motion.div>

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 100, y: 100 }}
          animate={{ scale: 1, x: n.x, y: n.y }}
          transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 150 }}
          className="absolute text-center text-[7px]"
        >
          <div className="bg-privue-100/50 rounded-md p-1 text-gray-800">{n.name}</div>
        </motion.div>
      ))}

      {/* Lines */}
      {nodes.map((n, i) => (
        <motion.svg key={`line-${i}`} className="absolute top-0 left-0" width="200" height="200">
          <motion.line
            x1="100"
            y1="100"
            x2={n.x + 20}
            y2={n.y + 10}
            stroke="#a0aec0"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          />
        </motion.svg>
      ))}
    </div>
  );
}
