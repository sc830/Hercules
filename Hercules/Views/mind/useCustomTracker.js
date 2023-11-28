import { useState, useEffect } from 'react';

/**
 * useCustomTracker.js: Hook that handles the logic for creating and managing trackers.
 * It handles the state and interactions for adding custom trackers, 
 * and prepares for future integration with Firestore for data persistence.
 * 
 * @param {Array} initialTrackers - An array of initial tracker names.
 * @returns An object containing various states and functions for tracker management.
 */
const useCustomTracker = (initialTrackers) => {
  // State for the list of tracker names.
  const [trackers, setTrackers] = useState(initialTrackers);
  // State to control the visibility of the 'add tracker' modal.
  const [modalVisible, setModalVisible] = useState(false);
  // State for the name of a new tracker being added.
  const [customTrackerName, setCustomTrackerName] = useState('');
  // State for storing tracker data, initially empty.
  const [editingTracker, setEditingTracker] = useState(null);
  const [trackerData, setTrackerData] = useState(initialTrackers.reduce((acc, tracker) => {
    acc[tracker] = [];
    return acc;
  }, {}));

  // Function to show the modal for adding a new tracker.
  const handleAddCustomTracker = () => {
    setModalVisible(true);
  };

  // Function to handle the submission of a new custom tracker.
  const submitCustomTracker = () => {
    if (customTrackerName.trim()) {
      setTrackers(prevTrackers => [...prevTrackers, customTrackerName]);
      // Update the tracker titles with the new tracker name
      setTrackerTitles(prevTitles => ({
        ...prevTitles,
        [customTrackerName]: customTrackerName
      }));
      setCustomTrackerName('');
      setModalVisible(false);
    }
  };

  // Function to delete a tracker with confirmation.
  const deleteTracker = (trackerName) => {
    setTrackers(prevTrackers => prevTrackers.filter(tracker => tracker !== trackerName));
    setTrackerData(prevData => {
      const newData = { ...prevData };
      delete newData[trackerName];
      return newData;
    });
    setTrackerTitles(prevTitles => {
      const newTitles = { ...prevTitles };
      delete newTitles[trackerName];
      return newTitles;
    });
  };

  // Function to rename trackers.
  const [trackerTitles, setTrackerTitles] = useState(initialTrackers.reduce((acc, tracker) => {
    acc[tracker] = tracker;
    return acc;
  }, {}));

  const updateTrackerTitle = (trackerName, newTitle) => {
    setTrackerTitles(prevTitles => ({
      ...prevTitles,
      [trackerName]: newTitle
    }));
  };

  // Finish editing tracker.
  const finishEditingTracker = (tracker, newTitle) => {
    updateTrackerTitle(tracker, newTitle);
    setEditingTracker(null); // This line exits the editing mode
  };

  // Placeholder for data fetching logic, for future Firestore integration.
  useEffect(() => {
    // Your teammate will implement the Firestore logic here.
    // Example:
    // fetchTrackerDataFromFirestore().then(data => setTrackerData(data));
  }, []);

  return {
    trackers,
    setTrackers,
    modalVisible,
    setModalVisible,
    customTrackerName,
    setCustomTrackerName,
    handleAddCustomTracker,
    submitCustomTracker,
    trackerData,
    setTrackerData,
    trackerTitles,
    setTrackerTitles, // Make sure this is returned
    updateTrackerTitle,
    deleteTracker,
    finishEditingTracker,
    editingTracker,
  };
};

export default useCustomTracker;
