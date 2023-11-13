// useCustomTracker.js
import { useState } from 'react';

const useCustomTracker = (initialTrackers) => {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [customTrackerName, setCustomTrackerName] = useState('');

  const addTracker = () => {
    if (customTrackerName.trim()) {
      setTrackers((prevTrackers) => [...prevTrackers, customTrackerName]);
      setCustomTrackerName(''); // Reset the custom tracker name
    }
  };

  return {
    trackers,
    setTrackers,
    customTrackerName,
    setCustomTrackerName,
    addTracker
  };
};

export default useCustomTracker;
