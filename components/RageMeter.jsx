import { useState, useEffect } from 'react';
import { AiFillFire, AiOutlineFire } from 'react-icons/ai';

const RageMeter = ({ franksRageLevel }) => {
  const [rageArray, setRageArray] = useState([]);

  const calculateRage = (franksRageLevel, franksMaxRage = 5) => {
    if (franksRageLevel === franksMaxRage) {
      return setRageArray(new Array(franksMaxRage).fill(true));
    }

    if (franksRageLevel < franksMaxRage) {
      const difference = franksMaxRage - franksRageLevel;
      const yesRage = new Array(franksRageLevel).fill(true);
      const noRage = new Array(difference).fill(false);
      return setRageArray([...yesRage, ...noRage]);
    }
  };

  useEffect(() => {
    calculateRage(franksRageLevel);
  }, []);

  return (
    <div className='flex items-center text-red-500'>
      <span className='mr-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-600'>
        Rage Level:
      </span>
      {rageArray.map((value, i) =>
        value ? <AiFillFire key={i} /> : <AiOutlineFire key={i} />
      )}
    </div>
  );
};

export default RageMeter;
