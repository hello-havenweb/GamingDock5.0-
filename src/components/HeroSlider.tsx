import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Flame, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { GameItem } from '../data/games';

interface HeroSliderProps {
  featuredGames: GameItem[];
  onNavigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ featuredGames, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto switch featured backdrop every 6 seconds
  useEffect(() => {
    if (featuredGames.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const currentGame = featuredGames[currentIndex] || featuredGames[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#242836] bg-[#0d0f15] min-h-[500px] md:min-h-[560px] flex items-center shadow-2xl">
      
      {/* BACKGROUND ARTWORK WITH TRANSITION */}
      {featuredGames.map((game, idx) => (
        <div
          key={game.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={game.heroBanner || game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* MULTI-LAYER DARK GRADIENTS FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-16 w-full flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT COLUMN: HERO TEXT */}
        <div className="max-w-2xl space-y-6">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15171e]/80 border border-[#242836] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff3045] animate-ping" />
            <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff3045]" />
              Curated PC Gaming Hub
            </span>
          </div>

          {/* HEADLINE */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            YOUR NEXT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9ca3af]">
              ADVENTURE
            </span>{' '}
            <span className="text-[#ff3045] drop-shadow-[0_0_20px_rgba(255,48,69,0.4)]">
              STARTS HERE
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed max-w-xl">
            Explore 50+ amazing PC games. Download, play and experience the best titles all in one place with verified hardware requirements and authentic links.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/games.html')}
              className="px-7 py-3.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all shadow-lg shadow-[#ff3045]/25 hover:shadow-[#ff3045]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Browse Games</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/categories.html')}
              className="px-7 py-3.5 rounded-xl bg-[#15171e]/90 hover:bg-[#202430] text-white font-semibold text-sm border border-[#242836] hover:border-[#ff3045]/50 backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              Explore Categories
            </button>
          </div>

          {/* TRUST PILLS */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff3045]" />
              <span>Verified System Specs</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ff3045]" />
              <span>Official Store Links</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>No Registration Required</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: FEATURED HIGHLIGHT CARD */}
        {currentGame && (
          <div className="hidden lg:flex flex-col items-end shrink-0 w-80 space-y-4">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#242836] bg-[#15171e] group shadow-2xl">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={currentGame.coverImage}
                  alt={currentGame.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 bg-[#15171e] border-t border-[#242836] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3045]">
                    Featured Spotlight
                  </span>
                  <span className="text-xs font-semibold text-amber-400">
                    ★ {currentGame.rating}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-white text-base truncate">
                  {currentGame.title}
                </h4>
                <p className="text-xs text-[#9ca3af] line-clamp-1">
                  {currentGame.genre} • {currentGame.size}
                </p>

                <button
                  onClick={() => onNavigate(`/games/${currentGame.slug}.html`)}
                  className="w-full mt-2 py-2 rounded-lg bg-[#ff3045]/20 hover:bg-[#ff3045] text-[#ff3045] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Quick View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Featured Game"
                className="p-2 rounded-lg bg-[#15171e] border border-[#242836] hover:border-[#ff3045] text-[#9ca3af] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5 px-2">
                {featuredGames.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex ? 'w-6 bg-[#ff3045]' : 'w-2 bg-[#242836]'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                aria-label="Next Featured Game"
                className="p-2 rounded-lg bg-[#15171e] border border-[#242836] hover:border-[#ff3045] text-[#9ca3af] hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
