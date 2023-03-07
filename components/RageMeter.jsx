import { useState, useEffect } from 'react';
import { AiFillFire, AiOutlineFire } from 'react-icons/ai';

const RageMeter = ({ rageLevel }) => {
  const [rageArray, setRageArray] = useState([]);

  const calculateRage = (rageLevel, max = 5) => {
    if (rageLevel === max) {
      return setRageArray(new Array(max).fill(true));
    }

    if (rageLevel < max) {
      const difference = max - rageLevel;
      const yesRage = new Array(rageLevel).fill(true);
      const noRage = new Array(difference).fill(false);
      return setRageArray([...yesRage, ...noRage]);
    }
  };

  useEffect(() => {
    calculateRage(rageLevel);
  }, []);

  return (
    <div className='flex items-center'>
      <span className='mr-1'>Rage Level:</span>
      {rageArray.map((value, i) =>
        value ? <AiFillFire key={i} /> : <AiOutlineFire key={i} />
      )}
    </div>
  );
};

export default RageMeter;
