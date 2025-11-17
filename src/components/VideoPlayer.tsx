import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  posterImage?: string;
}

export const VideoPlayer = ({ videoId, title, posterImage }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      {!isPlaying ? (
        <div
          className="absolute top-0 left-0 w-full h-full rounded-lg border border-border bg-secondary cursor-pointer group overflow-hidden"
          onClick={handlePlay}
        >
          {posterImage ? (
            <img
              src={posterImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">Recall Demo</div>
                <div className="text-muted-foreground">HackPrinceton F25</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent group-hover:scale-110 transition-transform flex items-center justify-center">
              <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg border border-border"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};
