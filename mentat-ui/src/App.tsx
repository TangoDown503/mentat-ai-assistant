import { AiChat } from '@/components/AiChat';

export default function App() {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#050d1a] via-[#0f2847] to-[#2a3a4a] relative overflow-hidden">
      {/* Metallic shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
      <AiChat />
    </div>
  );
}