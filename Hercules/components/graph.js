import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphWithButton = ({ currentData, previousData, labels, buttonText, onButtonPress }) => {
    // Ensure currentData and previousData are arrays before setting state
    const [data, setData] = useState(Array.isArray(currentData) ? currentData : new Array(labels.length).fill(0));

    const toggleData = () => {
        // Check if currentData and previousData are arrays before toggling
        if (Array.isArray(currentData) && Array.isArray(previousData)) {
            setData(data === currentData ? previousData : currentData);
        } else {
            // Fallback to an array of zeros if either is not an array
            setData(data === currentData ? new Array(labels.length).fill(0) : currentData);
        }
    };

    // Check if data is an array with elements before trying to render the graph
    if (!Array.isArray(data) || data.length === 0) {
        return <Text>No data available</Text>;
    }

    return (
        <View style={{ alignItems: 'center' }}>
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
            <TouchableOpacity onPress={toggleData}>
                <Text>{data === currentData ? 'Show Previous Week' : 'Show Current Week'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onButtonPress}>
                <Text style={{ textAlign: 'center' }}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GraphWithButton;
