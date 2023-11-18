import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphWithButton = ({ currentData, previousData, labels, buttonText, onButtonPress }) => {
    // Initialize the state with currentData or an array of zeros if no data
    const zeroData = new Array(labels.length).fill(0);
    const [data, setData] = useState(currentData && currentData.length > 0 ? currentData : zeroData);

    const toggleData = () => {
        // Toggle between current and previous data, defaulting to zeroData if none exist
        setData(data === currentData || !(currentData && currentData.length > 0)
                ? (previousData && previousData.length > 0 ? previousData : zeroData)
                : (currentData && currentData.length > 0 ? currentData : zeroData));
    };

    return (
        <View style={{ alignItems: 'center' }}>
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
                    strokeWidth: 2, // Optional: Set the stroke width of the line (default is 2)
                    propsForDots: {
                        r: "6", // Optional: Size of the dots in the line (default is 6)
                    },
                }}
            />
            </TouchableOpacity>
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
