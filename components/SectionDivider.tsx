export function SectionDivider() {
  return (
    <div className="relative py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E60000]/20 to-transparent" />
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#E60000] rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-[#E60000] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 bg-[#E60000] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E60000]/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
