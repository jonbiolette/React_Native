import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
  flex:1,
  },
  item: {

    padding: 5,
    fontSize: 18,
    height: 30,
  },
});

const List = () => {

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={[
          {key: 'Facebook'},
          {key: 'Instagram'},
          {key: 'Oculus'},
          {key: 'Coinbase'},
          {key: 'Shopify'},
          {key: 'Discord'},
          {key: 'NerdWallet'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

export default List;