import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const GraphWithButton = ({ initialData, labels, onButtonPress, trackerTitle }) => {
  const [dataByWeek, setDataByWeek] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week').format('YYYY-MM-DD'));

  // This effect sets the initial data for the current week when the component mounts.
  useEffect(() => {
    setDataByWeek(prevData => ({
      ...prevData,
      [currentWeekStart]: initialData && Array.isArray(initialData) && initialData.length === labels.length
        ? initialData
        : new Array(labels.length).fill(0),
    }));
  }, [initialData, labels.length]); // Removed currentWeekStart from the dependency array

  const formatDateRange = (start) => {
    const end = moment(start).endOf('week');
    return `${moment(start).format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`;
  };

  const handleWeekChange = (weekStart) => {
    setCurrentWeekStart(weekStart);
    // If there's no data for the new week, set it to default data.
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

  // Retrieves the data for the current week or defaults to zeroes if none exist.
  const currentData = dataByWeek[currentWeekStart] || new Array(labels.length).fill(0);

  return (
    <View style={{ alignItems: 'center' }}>
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
      {/* Graph Title */}
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: 'bold' }}>
        {trackerTitle}
      </Text>
    </View>
  );
};

export default GraphWithButton;
