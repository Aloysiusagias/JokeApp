import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const DATA = [
  {
    nama: 'Number',
    gambar: 'belum ada',
    categories: 'random',
  },
  {
    nama: 'Date',
    gambar: 'belum ada',
    categories: 'date',
  },
  {
    nama: 'Math',
    gambar: 'belum ada',
    categories: 'math',
  },
  {
    nama: 'Year',
    gambar: 'belum ada',
    categories: 'year',
  },
  {
    nama: 'Trivia',
    gambar: 'belum ada',
    categories: 'trivia',
  },
];

const numbermain = () => {
  const [category, setCagotary] = useState('random');
  const [number, setNumber] = useState('random');
  const [number2, setNumber2] = useState('random');
  const [fact, setFact] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [randoms, setRandoms] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (category == 'random') {
      axios.get('http://numbersapi.com/' + category).then((result) => {
        setFact(result.data);
        setLoading(false);
      });
    } else {
      axios
        .get('http://numbersapi.com/' + number + '/' + category)
        .then((result) => {
          setFact(result.data);
          setLoading(false);
        });
    }
  }, [category, number, randoms]);

  useEffect(() => {
    setLoading(true);
    {
      axios.get('http://numbersapi.com/' + number2).then((result) => {
        setFact(result.data);
        setLoading(false);
      });
    }
  }, [number2]);

  const date = () => {
    return (
      <View style={styles.containerBawah}>
        <TouchableOpacity
          style={{padding: 20, backgroundColor: 'royalblue'}}
          onPress={() => {
            setNumber('random');
            setRandoms(!randoms);
          }}>
          <Text style={{color: 'white'}}>Random</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%',
            marginVertical: 10,
          }}>
          <TextInput
            placeholder="Day"
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              textAlign: 'center',
            }}
            onChangeText={(result) => setDay(result)}
            keyboardType={'number-pad'}
          />
          <TextInput
            placeholder="Month"
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              textAlign: 'center',
            }}
            onChangeText={(result) => setMonth(result)}
            keyboardType={'number-pad'}
          />
          <TouchableOpacity
            style={{padding: 20, backgroundColor: 'royalblue'}}
            onPress={() => {
              if (day == null) {
                alert("Day can't empty");
              } else if (month == null) {
                setNumber(day);
              } else if (day > 31 || month > 12) {
                alert('input error');
              } else {
                setNumber(month + '/' + day);
              }
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text>{fact}</Text>
      </View>
    );
  };

  const numberr = () => {
    return (
      <View style={styles.containerBawah}>
        <TouchableOpacity
          style={{padding: 20, backgroundColor: 'royalblue'}}
          onPress={() => {
            setNumber('random');
            setRandoms(!randoms);
          }}>
          <Text style={{color: 'white'}}>Random</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%',
            marginVertical: 10,
          }}>
          <TextInput
            placeholder="Number"
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              textAlign: 'center',
            }}
            onChangeText={(result) => setDay(result)}
            keyboardType={'number-pad'}
          />
          <TouchableOpacity
            style={{padding: 20, backgroundColor: 'royalblue'}}
            onPress={() => {
              if (day == null) {
                alert("Number can't empty");
              } else {
                if (category == 'random') {
                  setNumber2(day);
                } else {
                  setNumber(day);
                }
              }
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text>{fact}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
          }}
          opacity={0.5}>
          <ActivityIndicator animating={true} size="large" color="blue" />
        </View>
      </Modal>
      <FlatList
        style={{height: '60%'}}
        data={DATA}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setCagotary(item.categories)}>
            <View
              style={{backgroundColor: 'black', width: '80%', height: '60%'}}
            />
            <Text style={styles.title}>{item.nama}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.nama}
      />
      {category == 'date' ? date() : numberr()}
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
  containerBawah: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
});

export default numbermain;
