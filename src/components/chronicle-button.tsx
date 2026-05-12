import React, { useState } from 'react';

interface ChronicleButtonProps {
  text: string;
  onClick?: () => void;
  hoverColor?: string;
  hoverForeground?: string;
  borderRadius?: string;
  fontFamily?: string;
  customBackground?: string;
  customForeground?: string;
}

export const ChronicleButton: React.FC<ChronicleButtonProps> = ({
  text,
  onClick,
  hoverColor,
  hoverForeground = '#fff',
  borderRadius = '8px',
  fontFamily = 'inherit',
  customBackground = '#005baa',
  customForeground = '#fff',
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        fontWeight: 600,
        fontFamily,
        borderRadius,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: hovered && hoverColor ? hoverColor : customBackground,
        color: hovered && hoverForeground ? hoverForeground : customForeground,
      }}
    >
      {text}
    </button>
  );
};
