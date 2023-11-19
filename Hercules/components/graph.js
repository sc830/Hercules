import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment'; // Make sure to install moment via npm or yarn

const GraphWithButton = ({ currentData, labels, onButtonPress, trackerTitle }) => {
    // Assuming currentData is for the current week. You'll need to adjust this if you fetch data differently.
    const [data, setData] = useState(currentData || new Array(labels.length).fill(0));
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));

    const formatDateRange = (start) => {
        const end = start.clone().endOf('week');
        return `${start.format('MMM DD, YYYY')} - ${end.format('MMM DD, YYYY')}`;
    };

    const handlePreviousWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().subtract(1, 'week'));
        // You'll also want to load the data for the new week here
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(currentWeekStart.clone().add(1, 'week'));
        // You'll also want to load the data for the new week here
    };

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
                        datasets: [{ data: data }],
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
