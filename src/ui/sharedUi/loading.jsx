import React, { useEffect } from 'react';
import lottie from 'lottie-web';

const AnimationLoader = ({ animationData }) => {

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById('animationContainer'),
      animationData,
      loop: true,
      autoplay: true, 
    });

    return () => {
      animation.destroy();
    };
  }, [animationData]);

  return <div id="animationContainer" />;
};

export default AnimationLoader;
