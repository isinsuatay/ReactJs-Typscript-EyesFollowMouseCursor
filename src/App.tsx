import React, { useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: mouseX, clientY: mouseY } = e;

      [leftEyeRef, rightEyeRef].forEach((eyeRef) => {
        const pupil = eyeRef.current?.querySelector('.pupil');
        const imageRect = eyeRef.current?.getBoundingClientRect();

        if (pupil && imageRect) {
          const { left, top, width, height } = imageRect;
          const imageCenterX = left + width / 2;
          const imageCenterY = top + height / 2;

          const angle = Math.atan2(mouseY - imageCenterY, mouseX - imageCenterX);
          const distance = Math.min(15, Math.hypot(mouseX - imageCenterX, mouseY - imageCenterY));

          const offsetX = Math.cos(angle) * distance;
          const offsetY = Math.sin(angle) * distance;

          pupil.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
        <h1>Animated Eyes Follow Mouse Cursor</h1>
        <img id="image" src="./robot.PNG" alt="Hareketli Gözler" />
        <div className="eye" id="leftEye" ref={leftEyeRef}>
          <div className="pupil"></div>
        </div>
        <div className="eye" id="rightEye" ref={rightEyeRef}>
          <div className="pupil"></div>
        </div>
    </div>
  );
};

export default App;
