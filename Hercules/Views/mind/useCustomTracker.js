import { useState } from 'react';

const useCustomTracker = (initialTrackers) => {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [modalVisible, setModalVisible] = useState(false);
  const [customTrackerName, setCustomTrackerName] = useState('');

  const handleAddCustomTracker = () => {
    setModalVisible(true);
  };

  const submitCustomTracker = () => {
    if (customTrackerName.trim()) {
      setTrackers(prevTrackers => [...prevTrackers, customTrackerName]);
      setCustomTrackerName('');
      setModalVisible(false);
    }
  };

  return {
    trackers,
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
  };
};

export default useCustomTracker;
