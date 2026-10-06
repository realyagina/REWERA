import React from 'react';

interface ProductImageWithColorProps {
  src: string;
  alt: string;
  colorHex?: string;
  colorName?: string;
  className?: string;
  imgClassName?: string;
  showColorBadge?: boolean;
  priority?: boolean;
}

export const ProductImageWithColor: React.FC<ProductImageWithColorProps> = ({
  src,
  alt,
  colorHex,
  colorName,
  className = '',
  imgClassName = '',
  showColorBadge = false,
}) => {
  // Determine if this is a tinted variant (not plain white/neutral)
  const isTinted = Boolean(colorHex);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base Photograph */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-500 ${imgClassName}`}
      />

      {/* Realistic Dynamic Fabric Color Tint Layers */}
      {isTinted && colorHex && (
        <>
          {/* Hue & Saturation colorization layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-400 ease-in-out"
            style={{
              backgroundColor: colorHex,
              mixBlendMode: 'color',
              opacity: 0.58,
            }}
          />

          {/* Depth & shade richness layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-400 ease-in-out"
            style={{
              backgroundColor: colorHex,
              mixBlendMode: 'multiply',
              opacity: 0.18,
            }}
          />
        </>
      )}

      {/* Floating Active Color Swatch Tag */}
      {showColorBadge && colorName && (
        <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] text-[#24211E] font-medium flex items-center gap-1.5 border border-[#2C2926]/10 shadow-xs rounded-xs pointer-events-none transition-all duration-300">
          {colorHex && (
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
              style={{ backgroundColor: colorHex }}
            />
          )}
          <span className="truncate max-w-[120px]">{colorName}</span>
        </div>
      )}
    </div>
  );
};
