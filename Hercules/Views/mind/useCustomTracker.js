import { useState } from 'react';

const useCustomTracker = (initialTrackers) => {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [modalVisible, setModalVisible] = useState(false);
  const [customTrackerName, setCustomTrackerName] = useState('');

  const handleAddCustomTracker = () => {
    setModalVisible(true);

    useEffect(() => {
      // Placeholder for Firestore data fetching
      // Fetch data for each tracker and update trackerData state
      // Your teammate can implement the Firestore logic here
  
      // Example:
      // fetchTrackerDataFromFirestore().then(data => setTrackerData(data));
    }, []);
  };

  const [trackerData, setTrackerData] = useState(initialTrackers.reduce((acc, tracker) => {
    acc[tracker] = []; // Initially, data for each tracker is an empty array
    return acc;
  }, {}));

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
    trackerData,
    setTrackerData,
  };
};

export default useCustomTracker;
