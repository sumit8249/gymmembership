import React, { useState, useRef, useEffect } from 'react';
import { ScreenType, Member, Coach, ChatMessage } from '../types';
import { COACH_JAX, INITIAL_CHAT_MESSAGES } from '../data/gymData';

interface CoachChatScreenProps {
  member: Member;
  coach?: Coach;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string, icon?: string) => void;
  onOpenVideo: (videoUrl: string) => void;
}

export const CoachChatScreen: React.FC<CoachChatScreenProps> = ({
  member,
  coach = COACH_JAX,
  onNavigate,
  onShowToast,
  onOpenVideo
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated Coach Reply after short delay
    setTimeout(() => {
      const coachReplies = [
        "Sounds like a plan! Rig A is prepped with competition plates. See you shortly! 💪",
        "Got it Sarah! Make sure to take 2-3 minutes rest between working sets.",
        "Checked and confirmed. You're moving with great kinetic bar speed today.",
        "Locked in! Remember to brace that core before breaking the floor."
      ];
      const randomReply = coachReplies[Math.floor(Math.random() * coachReplies.length)];

      const coachMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'coach',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages((prev) => [...prev, coachMsg]);
    }, 1200);
  };

  const handleVoiceRecord = () => {
    setIsPlayingAudio(!isPlayingAudio);
    onShowToast(isPlayingAudio ? 'Audio memo paused' : 'Playing Coach Jax voice memo (0:38)', 'mic');
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)] max-w-lg mx-auto bg-[#0f131c]">
      {/* Top Chat Bar */}
      <div className="px-4 py-2.5 bg-[#181c24] border-b border-white/[0.06] flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('member-detail')}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center hover:bg-[#31353e] active:scale-95 transition-all"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>

          <div className="relative">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-[#c3f400]"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#c3f400] ring-2 ring-[#181c24]"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-headline font-bold text-[14px] text-[#dfe2ee] truncate">
                {coach.name}
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#c3f400]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <span className="text-[11px] text-[#c3f400] font-medium">
              {coach.title} • Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="tel:+15550198429"
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center hover:bg-[#31353e] active:scale-95"
            aria-label="Voice Call"
          >
            <span className="material-symbols-outlined text-[17px] text-[#7bd0ff]">call</span>
          </a>
          <button
            onClick={() => onShowToast('Calling Coach Jax video line...', 'videocam')}
            className="w-8 h-8 rounded-full bg-[#262a33] text-[#dfe2ee] flex items-center justify-center hover:bg-[#31353e] active:scale-95"
            aria-label="Video Call"
          >
            <span className="material-symbols-outlined text-[17px] text-[#c3f400]">videocam</span>
          </button>
        </div>
      </div>

      {/* Pinned Session Context Ribbon */}
      <div className="px-4 py-2 bg-[#1c2028] border-b border-white/[0.04] flex items-center justify-between text-[11px] shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#c3f400]">event_available</span>
          <span className="text-[#dfe2ee] font-semibold">
            Next Session: <strong className="text-[#c3f400]">Today 02:00 PM</strong> (Rig A)
          </span>
        </div>
        <button
          onClick={() => onNavigate('pass')}
          className="text-[#c3f400] font-bold hover:underline"
        >
          View Pass &gt;
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[90%] ${
                isUser ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Standard Text Bubble */}
              {msg.type === 'text' && (
                <div
                  className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#c3f400] text-[#161e00] rounded-tr-none font-medium'
                      : 'bg-[#1c2028] text-[#dfe2ee] rounded-tl-none border border-white/[0.04]'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {/* Workout Plan Card (Coach Jax Directive) */}
              {msg.type === 'workout_plan' && msg.workoutPlan && (
                <div className="bg-[#1c2028] rounded-2xl rounded-tl-none p-4 border border-white/[0.06] shadow-lg w-full max-w-sm space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c3f400] text-[20px]">fitness_center</span>
                      <span className="font-headline font-bold text-[14px] text-[#dfe2ee]">
                        {msg.workoutPlan.title}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[10px] font-bold">
                      {msg.workoutPlan.target}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {msg.workoutPlan.items.map((item, idx) => (
                      <div key={idx} className="bg-[#262a33] p-2.5 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#dfe2ee] block">{item.name}</span>
                          <span className="text-[11px] text-[#94a3b8]">{item.details}</span>
                        </div>
                        {item.meta && (
                          <span className="text-[10px] font-bold text-[#c3f400] bg-[#1c2028] px-2 py-0.5 rounded">
                            {item.meta}
                          </span>
                        )}
                        {item.icon && (
                          <span className="material-symbols-outlined text-[16px] text-[#94a3b8]">
                            {item.icon}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-[#94a3b8]">
                    <span>{msg.workoutPlan.preset}</span>
                    <span className="text-[#c3f400] font-semibold">Ready</span>
                  </div>
                </div>
              )}

              {/* Voice Memo Audio Bubble */}
              {msg.type === 'voice_memo' && (
                <div className="bg-[#1c2028] rounded-2xl rounded-tl-none p-3 border border-white/[0.06] shadow-md flex items-center gap-3 w-64">
                  <button
                    onClick={handleVoiceRecord}
                    className="w-10 h-10 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center shrink-0 active:scale-95 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPlayingAudio ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-1 h-6">
                      {/* Audio wave bars */}
                      {[4, 12, 8, 16, 22, 14, 20, 10, 18, 6, 14, 8, 12].map((height, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio ? 'bg-[#c3f400]' : 'bg-[#31353e]'
                          }`}
                          style={{ height: `${height}px` }}
                        ></span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#94a3b8] mt-1">
                      <span>Coach Voice Memo</span>
                      <span className="font-bold text-[#dfe2ee]">{msg.audioDuration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Check Video Bubble */}
              {msg.type === 'video_check' && (
                <div
                  onClick={() => onOpenVideo(msg.videoThumb || '')}
                  className="relative rounded-2xl rounded-tr-none overflow-hidden cursor-pointer group shadow-lg border border-white/10 max-w-[220px]"
                >
                  <img
                    src={msg.videoThumb}
                    alt="Form Check Video"
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#c3f400]/90 text-[#161e00] flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-[26px]">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                    {msg.videoDuration}
                  </span>
                  <div className="p-2 bg-[#1c2028] text-[11px] text-[#dfe2ee]">
                    {msg.videoCaption}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <span className="text-[10px] text-[#94a3b8] mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0 bg-[#0f131c]">
        {['Ready for Rig A! ⚡', 'Check deadlift video 📹', 'Need 5m warm up buffer'].map((chip) => (
          <button
            key={chip}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1 rounded-full bg-[#1c2028] hover:bg-[#262a33] text-[#c3f400] text-[11px] font-semibold shrink-0 border border-white/[0.04] active:scale-95 transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input Dock */}
      <div className="p-3 bg-[#181c24] border-t border-white/[0.06] flex items-center gap-2 shrink-0">
        <button
          onClick={() => onShowToast('Video form upload modal active', 'video_camera_front')}
          className="w-9 h-9 rounded-full bg-[#262a33] text-[#94a3b8] hover:text-[#dfe2ee] flex items-center justify-center active:scale-95 shrink-0"
          aria-label="Attach File"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Message Coach Jax..."
          className="flex-1 bg-[#262a33] text-[#dfe2ee] placeholder:text-[#94a3b8] text-[13px] px-3.5 py-2.5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#c3f400]"
        />

        <button
          onClick={() => handleSendMessage()}
          className="w-10 h-10 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center active:scale-95 shadow-md hover:brightness-105 shrink-0"
          aria-label="Send Message"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">send</span>
        </button>
      </div>
    </div>
  );
};
