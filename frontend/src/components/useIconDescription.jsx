import { useState } from 'react';

const useIconDescription = () => {
  const [iconDescription, setIconDescription] = useState('');

  const handleMouseEnter = (description) => {
    setIconDescription(description);
  };

  const handleMouseLeave = () => {
    setIconDescription('');
  };

  return {
    iconDescription,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useIconDescription;
