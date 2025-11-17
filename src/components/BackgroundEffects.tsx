import abstractTechBackground from "@/assets/abstract-tech-background.jpg";

export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#F9F5EF]">
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-[0.09]"
        style={{ 
          backgroundImage: `url(${abstractTechBackground})`,
          backgroundSize: '90%'
        }}
      />
    </div>
  );
};
