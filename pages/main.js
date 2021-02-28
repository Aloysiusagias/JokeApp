import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    nama: 'Programming',
    gambar: 'belum ada',
  },
  {
    nama: 'Misc',
    gambar: 'belum ada',
  },
  {
    nama: 'Dark',
    gambar: 'belum ada',
  },
  {
    nama: 'Pun',
    gambar: 'belum ada',
  },
  {
    nama: 'Spooky',
    gambar: 'belum ada',
  },
  {
    nama: 'Christmas',
    gambar: 'belum ada',
  },
];

const main = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        style={{flex: 1}}
        data={DATA}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('joke', {category: item.nama})}>
            <View
              style={{backgroundColor: 'black', width: '80%', height: '60%'}}
            />
            <Text style={styles.title}>{item.nama}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.nama}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '40%',
    height: 100,
    backgroundColor: 'red',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default main;
