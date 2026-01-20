import { AiChat } from '@/components/AiChat';

export default function App() {
  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-[#050d1a] via-[#0f2847] to-[#2a3a4a] relative overflow-hidden">
      {/* Metallic shine effect overlay */}
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <AiChat />
      </div>
    </div>
  );
}