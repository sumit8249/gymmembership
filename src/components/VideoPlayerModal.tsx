import React, { useState } from 'react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoThumb: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  videoThumb
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full overflow-hidden border border-white/10 shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#262a33] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400]">videocam</span>
            <span className="font-headline font-bold text-[14px] text-[#dfe2ee]">
              Sarah Jenkins • Deadlift Form Check
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181c24] text-[#94a3b8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={videoThumb}
            alt="Deadlift Video Frame"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Kinematic Analysis Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Rec 00:14
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-[#c3f400] text-[10px] font-bold">
                Bar Speed: 0.62 m/s
              </span>
            </div>

            {/* Simulated Joint Angle Vector Lines */}
            <div className="space-y-1 text-[11px] text-white/90">
              <div className="flex justify-between bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
                <span>Hip Angle:</span>
                <span className="font-bold text-[#c3f400]">108° (Optimal Hinge)</span>
              </div>
              <div className="flex justify-between bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
                <span>Bar Path:</span>
                <span className="font-bold text-[#7bd0ff]">Vertical Drift: 1.2 cm</span>
              </div>
            </div>
          </div>

          {/* Center Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-14 h-14 rounded-full bg-[#c3f400]/90 text-[#161e00] flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[32px] font-bold">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Video Scrubber & Coach Feedback */}
        <div className="p-4 space-y-3">
          <div className="w-full bg-[#31353e] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#c3f400] h-full rounded-full" style={{ width: isPlaying ? '72%' : '40%' }}></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
            <span>00:10 / 00:14</span>
            <span className="text-[#c3f400] font-semibold">Rep 3 of 3</span>
          </div>

          <p className="text-[12px] text-[#c4c9ac] italic">
            Coach Jax: "Hip hinge cue locked in. Bar stays flush against shins. Ready for 180kg attempt."
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#262a33] text-[#dfe2ee] text-[12px] font-bold hover:bg-[#31353e]"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
};
