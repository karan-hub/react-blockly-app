import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import BlocklyComponent from './BlocklyComponent';
import CatSprite from './CatSprite';

function App() {
  const [cats, setCats] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 300, y: 300 },
  ]);

  const addCat = () => {
    const newCat = {
      id: cats.length + 1,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    setCats([...cats, newCat]);
  };

  return (
    <div>
      <h1>Scratch-like Environment</h1>
      <button onClick={addCat}>Add Cat Sprite</button>
      <BlocklyComponent />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {cats.map((cat) => (
            <CatSprite key={cat.id} x={cat.x} y={cat.y} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
