import { useEffect, useRef } from "react";
import { Accelerometer } from "expo-sensors";

export default function useShake(onShake) {
  const shakeCount = useRef(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(200); 

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);

      if (totalForce > 2.5) {              
        shakeCount.current += 1;

        if (shakeCount.current >= 3) {     
          onShake();
          shakeCount.current = 0;
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return null;
}
