export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main gradient orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20">
        <div className="absolute inset-0 bg-[#E60000] blur-[120px] animate-chaos-float" />
      </div>
      
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] opacity-15">
        <div className="absolute inset-0 bg-[#E60000] blur-[100px] animate-chaos-float" style={{ animationDelay: '2s', animationDuration: '25s' }} />
      </div>
      
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] opacity-10">
        <div className="absolute inset-0 bg-[#101010] blur-[80px] animate-chaos-float" style={{ animationDelay: '4s', animationDuration: '30s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #101010 1px, transparent 1px),
              linear-gradient(to bottom, #101010 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Decorative dots scattered */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-[#E60000] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-32 right-32 w-1 h-1 bg-[#E60000] rounded-full opacity-30 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-[#E60000] rounded-full opacity-50 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
      
      <div className="absolute bottom-40 left-32 w-2 h-2 bg-[#E60000] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.3s' }} />
      <div className="absolute bottom-52 left-24 w-1 h-1 bg-[#E60000] rounded-full opacity-30 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.8s' }} />
      
      <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-[#E60000] rounded-full opacity-35 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1.2s' }} />
      <div className="absolute top-1/3 right-10 w-1 h-1 bg-[#E60000] rounded-full opacity-40 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.7s' }} />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/30" />
    </div>
  );
}
