import React, { useState } from 'react';
import { Member } from '../types';

interface QuickScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onScanSuccess: (member: Member) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const QuickScanModal: React.FC<QuickScanModalProps> = ({
  isOpen,
  onClose,
  members,
  onScanSuccess,
  onShowToast
}) => {
  const [scanMode, setScanMode] = useState<'qr' | 'nfc'>('qr');
  const [isVerifying, setIsVerifying] = useState(false);
  const [scannedMember, setScannedMember] = useState<Member | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (member: Member) => {
    setIsVerifying(true);
    setScannedMember(null);

    setTimeout(() => {
      setIsVerifying(false);
      setScannedMember(member);
      onScanSuccess(member);
      onShowToast(`Check-In Approved: ${member.name} (${member.tier})`, 'verified');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181c24] rounded-3xl max-w-sm w-full p-5 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-white flex items-center justify-center active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mt-1 mb-4">
          <span className="text-[10px] font-bold text-[#c3f400] uppercase tracking-wider mb-0.5">
            Turnstile Fast Lane Kiosk
          </span>
          <h3 className="font-headline font-extrabold text-[20px] text-[#dfe2ee]">
            {scanMode === 'qr' ? 'Optical QR Scanner' : 'Contactless NFC Tap'}
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-[#0a0e16] p-1 rounded-xl mb-4 w-full">
          <button
            onClick={() => setScanMode('qr')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
              scanMode === 'qr' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>QR Camera</span>
          </button>
          <button
            onClick={() => setScanMode('nfc')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
              scanMode === 'nfc' ? 'bg-[#c3f400] text-[#161e00]' : 'text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">contactless</span>
            <span>RFID / NFC</span>
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="relative w-60 h-60 rounded-2xl bg-[#0a0e16] border-2 border-dashed border-[#c3f400]/40 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Corner Guides */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#c3f400]"></div>
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#c3f400]"></div>
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#c3f400]"></div>
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#c3f400]"></div>

          {/* Laser Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#c3f400] to-transparent animate-pulse shadow-[0_0_12px_#c3f400]"></div>

          {isVerifying ? (
            <div className="flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[36px] text-[#c3f400] animate-spin">
                progress_activity
              </span>
              <span className="text-[12px] font-bold text-[#c3f400]">Verifying RFID Credentials...</span>
            </div>
          ) : scannedMember ? (
            <div className="flex flex-col items-center gap-1 text-center p-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[28px] font-bold">check</span>
              </div>
              <span className="text-[14px] font-bold text-[#dfe2ee]">{scannedMember.name}</span>
              <span className="text-[11px] text-[#c3f400] font-semibold">{scannedMember.tier}</span>
              <span className="text-[10px] text-[#94a3b8]">Turnstile A Unlocked</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center p-4 text-[#94a3b8]">
              <span className="material-symbols-outlined text-[40px] text-[#c3f400]/80 mb-2">
                {scanMode === 'qr' ? 'qr_code_2' : 'sensors'}
              </span>
              <p className="text-[11px] max-w-[160px]">
                {scanMode === 'qr'
                  ? 'Align pass QR code within the frame to verify'
                  : 'Hold member wristband or phone near sensor'}
              </p>
            </div>
          )}
        </div>

        {/* Quick Simulation Taps */}
        <div className="w-full mt-4">
          <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider block mb-2 text-center">
            Tap Member to Simulate Instant Badge Scan:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {members.slice(0, 4).map((m) => (
              <button
                key={m.id}
                onClick={() => handleSimulateScan(m)}
                className="p-2 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-left flex items-center gap-2 border border-white/[0.04] active:scale-95 transition-all"
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-[#dfe2ee] truncate block">
                    {m.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-[#c3f400] truncate block">
                    #{m.rfid}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[12px] font-semibold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
