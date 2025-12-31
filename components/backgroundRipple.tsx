import React, { useState, useMemo } from 'react';
import { Eye, CheckCircle, Shield, MapPin, DollarSign } from 'lucide-react';

const BackgroundRippleEffect = ({
  rows = 12,
  cols = 30,
  cellSize = 50,
}) => {
  const [clickedCell, setClickedCell] = useState<any>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: 'auto',
  };

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <style>{`
        @keyframes cell-ripple {
          0% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 0.2; transform: scale(0.95); }
        }
        .animate-cell-ripple {
          animation: cell-ripple var(--duration, 200ms) ease-out var(--delay, 0ms);
        }
      `}</style>
      <div className="relative z-0" style={gridStyle}>
        {cells.map((idx) => {
          const rowIdx = Math.floor(idx / cols);
          const colIdx = idx % cols;
          const distance = clickedCell
            ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
            : 0;
          const delay = clickedCell ? Math.max(0, distance * 50) : 0;
          const duration = 200 + distance * 70;

          const style = clickedCell
            ? {
                '--delay': `${delay}ms`,
                '--duration': `${duration}ms`,
              }
            : {};

          return (
            <div
              key={idx}
              className={`relative border border-purple-400/20 bg-purple-500/5 opacity-30 transition-all duration-150 hover:opacity-60 hover:bg-purple-500/10 cursor-pointer ${
                clickedCell ? 'animate-cell-ripple' : ''
              }`}
              style={style as any}
              onClick={() => {
                setClickedCell({ row: rowIdx, col: colIdx });
                setRippleKey((k) => k + 1);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default BackgroundRippleEffect