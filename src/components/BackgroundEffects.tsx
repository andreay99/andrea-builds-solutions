import abstractBackground from "@/assets/abstract-background.jpg";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F5F3F0]">
      {/* Subtle abstract illustration - extremely low opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.10]"
        style={{ 
          backgroundImage: `url(${abstractBackground})`,
        }}
      />
    </div>
  );
};
