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
  return (
    <div className={`relative overflow-hidden bg-[#F2EDE4]/60 ${className}`}>
      {/* Authentic High-Res Garment Photo corresponding to the chosen color option */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-opacity duration-300 ${imgClassName}`}
      />

      {/* Elegant Active Color Tag / Swatch Indicator */}
      {showColorBadge && colorName && (
        <div className="absolute top-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] text-[#24211E] font-medium flex items-center gap-1.5 border border-[#2C2926]/10 shadow-xs rounded-xs pointer-events-none transition-all duration-300">
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
