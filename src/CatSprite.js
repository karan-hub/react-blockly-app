// CatSprite.js
import React, { useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const CatSprite = ({ x, y }) => {
  const [image] = useImage('/cat_sprite.png'); // Add your cat image here
  const [position, setPosition] = useState({ x: x, y: y });

  return (
    <Image
      image={image}
      x={position.x}
      y={position.y}
      draggable
      onDragEnd={(e) => {
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
};

export default CatSprite;
