import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const GraphWithButton = ({ initialData, labels, onButtonPress, trackerTitle, onTitleChange }) => {
  const [dataByWeek, setDataByWeek] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week').format('YYYY-MM-DD'));
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(trackerTitle);

  useEffect(() => {
    setDataByWeek(prevData => ({
      ...prevData,
      [currentWeekStart]: initialData && Array.isArray(initialData) && initialData.length === labels.length
        ? initialData
        : new Array(labels.length).fill(0),
    }));
  }, [initialData, labels.length, currentWeekStart]);

  const formatDateRange = (start) => {
    const end = moment(start).endOf('week');
    return `${moment(start).format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`;
  };

  const handleWeekChange = (weekStart) => {
    setCurrentWeekStart(weekStart);
    setDataByWeek(prevData => ({
      ...prevData,
      [weekStart]: prevData[weekStart] || new Array(labels.length).fill(0),
    }));
  };

  const handlePreviousWeek = () => {
    const previousWeekStart = moment(currentWeekStart).subtract(1, 'week').format('YYYY-MM-DD');
    handleWeekChange(previousWeekStart);
  };

  const handleNextWeek = () => {
    const nextWeekStart = moment(currentWeekStart).add(1, 'week').format('YYYY-MM-DD');
    handleWeekChange(nextWeekStart);
  };

  const handleEdit = () => {
    console.log("Entering edit mode");
    setIsEditing(true);
  };

  const handleSubmitEditing = () => {
    console.log("Submitting new title:", editableTitle);
    onTitleChange(editableTitle); // Call the passed-in function to update the title
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setEditableTitle(trackerTitle); // Reset the editable title to the original
    setIsEditing(false);
  };

  const currentData = dataByWeek[currentWeekStart] || new Array(labels.length).fill(0);

  return (
    <View style={{ alignItems: 'center' }}>
      {isEditing ? (
        <TextInput
          value={editableTitle}
          onChangeText={setEditableTitle}
          onEndEditing={handleSubmitEditing}
          autoFocus={true}
          style={{ /* Your TextInput styling here */ }}
        />
      ) : (
        <TouchableOpacity onPress={handleEdit}>
          <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>{editableTitle}</Text>
        </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <TouchableOpacity onPress={handlePreviousWeek}>
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center' }}>
          {formatDateRange(currentWeekStart)}
        </Text>
        <TouchableOpacity onPress={handleNextWeek}>
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onButtonPress} style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: currentData }],
          }}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GraphWithButton;