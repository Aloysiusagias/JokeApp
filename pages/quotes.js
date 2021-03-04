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
    nama: 'Benjamin Franklin',
    gambar: 'belum ada',
    link: 'Benjamin Franklin',
  },
  {
    nama: 'Albert Einstein',
    gambar: 'belum ada',
    link: 'Albert Einstein',
  },
  {
    nama: 'Mahatma Gandhi',
    gambar: 'belum ada',
    link: 'Mahatma Gandhi',
  },
  {
    nama: 'Abraham Lincoln',
    gambar: 'belum ada',
    link: 'Abraham Lincoln',
  },
  {
    nama: 'Aristotle',
    gambar: 'belum ada',
    link: 'Aristotle',
  },
  {
    nama: 'Random Author',
    gambar: 'belum ada',
    link: 'random',
  },
];

const quotes = () => {
  const [quotee, setQuotee] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [randoms, setRandoms] = useState(true);
  const [author, setAuthor] = useState('random');
  const [author2, setAuthor2] = useState('loading');

  useEffect(() => {
    setLoading(true);
    if (author == 'random') {
      axios.get('https://api.quotable.io/' + author).then((result) => {
        setQuotee(result.data.content);
        setAuthor2(result.data.author);
        setLoading(false);
      }).then(errr => console.log(errr));
    } else {
      axios
        .get('https://api.quotable.io/random', {
          params: {
            author: author,
          },
        })
        .then((result) => {
          setQuotee(result.data.content);
          setAuthor2(result.data.author);
          setLoading(false);
        });
    }
  }, [author, randoms]);

  const quote = () => {
    return (
      <View style={styles.containerBawah}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 35,
            paddingVertical: 15,
            backgroundColor: 'royalblue',
            marginBottom: 20,
          }}
          onPress={() => {
            setRandoms(!randoms);
          }}>
          <Text style={{color: 'white'}}>More</Text>
        </TouchableOpacity>
        <Text>{quotee}</Text>
        <Text>~ {author2} ~</Text>
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
            onPress={() => setAuthor(item.link)}>
            <View
              style={{backgroundColor: 'black', width: '80%', height: '60%'}}
            />
            <Text style={styles.title}>{item.nama}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.nama}
      />
      {quote()}
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

export default quotes;
