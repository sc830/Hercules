import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const GraphWithButton = ({ initialData, labels, onButtonPress, trackerTitle, onTitleChange }) => {
  const [dataByWeek, setDataByWeek] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week').format('YYYY-MM-DD'));
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(trackerTitle);

  // Inline styles for date navigation
  const navStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This will space out your elements
    marginBottom: 5,
    width: '100%', // Ensure the width takes up the full container
    paddingHorizontal: 20, // Add padding to prevent text from touching the edges
  };

  const dateTextStyle = {
    fontSize: 14, // Adjust the font size as needed
    fontWeight: 'bold',
  };

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
    setIsEditing(true);
  };

  const handleSubmitEditing = () => {
    onTitleChange(editableTitle);
    setIsEditing(false);
  };

  // Inline styles for editable text input
  const textInputStyle = {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    minWidth: '80%', // Set a minimum width for the text input
  };

  // Inline styles for the title text
  const titleTextStyle = {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Ensure the title is centered
  };

  const currentData = dataByWeek[currentWeekStart] || new Array(labels.length).fill(0);

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      {isEditing ? (
        <TextInput
          value={editableTitle}
          onChangeText={setEditableTitle}
          onEndEditing={handleSubmitEditing}
          autoFocus={true}
          style={textInputStyle}
        />
      ) : (
        <TouchableOpacity onPress={handleEdit}>
          <Text style={titleTextStyle}>{editableTitle}</Text>
        </TouchableOpacity>
      )}

      <View style={navStyle}>
        <TouchableOpacity onPress={handlePreviousWeek}>
          <Text>{"<"}</Text>
        </TouchableOpacity>
        {/* Ensure that the date range text container has enough space */}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={[dateTextStyle, { textAlign: 'center' }]}>
            {formatDateRange(currentWeekStart)}
          </Text>
        </View>
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
