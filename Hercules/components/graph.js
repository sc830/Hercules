//graph.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

// This file shows a graph of health tracker data and lets you change the graph's title by clicking a gear icon.

const GraphWithButton = ({
  initialData,
  labels,
  onButtonPress,
  trackerTitle,
  onTitleChange, // This prop should be passed in from the parent component
  editing // This prop should also be passed in from the parent component
}) => {
  const [dataByWeek, setDataByWeek] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week').format('YYYY-MM-DD'));

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

  const currentData = dataByWeek[currentWeekStart] || new Array(labels.length).fill(0);

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {trackerTitle}
        </Text>
        {!editing && ( // Use the editing prop to conditionally render the gear icon
          <TouchableOpacity onPress={onTitleChange} style={{ padding: 5, marginLeft: 10 }}>
            <Text style={{ fontSize: 16 }}>⚙️</Text> 
          </TouchableOpacity>
        )}
      </View> 


      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <TouchableOpacity onPress={handlePreviousWeek} style={{ padding: 10 }}>
          <Text>{"<"}</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>
            {formatDateRange(currentWeekStart)}
          </Text>
        </View>

        <TouchableOpacity onPress={handleNextWeek} style={{ padding: 10 }}>
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onButtonPress} style={{ alignItems: 'center' }}>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: currentData }],
          }}
          width={300} // Adjust as necessary for your layout
          height={200} // Adjust as necessary for your layout
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GraphWithButton;
