import React from 'react';

const LoginBackground = () => {
  return (
    <>
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-card/50 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Floating Music Notes */}
        <div className="absolute top-20 left-10 w-4 h-4 text-primary/20 animate-bounce">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute top-40 right-16 w-6 h-6 text-accent/20 animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-20 w-5 h-5 text-primary/15 animate-bounce delay-300">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-3 h-3 text-accent/25 animate-pulse delay-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>

        {/* Glassmorphism Circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </>
  );
};

export default LoginBackground;