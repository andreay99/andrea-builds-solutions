interface CaseStudySectionProps {
  title: string;
  children: React.ReactNode;
}

export const CaseStudySection = ({ title, children }: CaseStudySectionProps) => {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-0.5 w-12 bg-accent"></div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
};
