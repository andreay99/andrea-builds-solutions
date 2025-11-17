import spaceBackground from "@/assets/space-background.jpg";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Fixed background image with low opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.15]"
        style={{ 
          backgroundImage: `url(${spaceBackground})`,
        }}
      />
      
      {/* Dark gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"
      />
    </div>
  );
};
