// DraggableFlatList.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DraggableFlatListLibrary from 'react-native-draggable-flatlist';

const renderItem = ({ item, index, drag, isActive }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer(isActive)}
      onLongPress={drag}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );
};

const DraggableFlatList = ({ data, setData }) => {
  return (
    <DraggableFlatListLibrary
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `draggable-item-${index}`}
      onDragEnd={({ data }) => setData(data)}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: isActive => ({
    backgroundColor: isActive ? 'blue' : 'grey',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  }),
  itemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DraggableFlatList;
