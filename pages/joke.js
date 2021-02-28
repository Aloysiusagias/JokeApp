import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const joke = () => {
  const route = useRoute();
  const [joke, setJoke] = useState('loading joke..');
  const [punch, setPunch] = useState('loading punchline..');
  const [single, setSingle] = useState(false);
  const [double, setDouble] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://v2.jokeapi.dev/joke/' + route.params.category, {
        params: {
          format: 'json',
          lang: 'en',
          type: 'single',
        },
      })
      .then((result) => {
        setJoke(result.data.joke == null ? 'there is no joke in single': result.data.joke);
        setPunch('');
        console.log(result.data);
        setLoading(false)
      });
  }, [single]);

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://v2.jokeapi.dev/joke/' + route.params.category, {
        params: {
          format: 'json',
          lang: 'en',
          type: 'twopart',
        },
      })
      .then((result) => {
        setJoke(result.data.setup == null ? 'there is no joke in single': result.data.setup);
        setPunch(result.data.delivery);
        console.log(result.data);
        setLoading(false)
      });
  }, [double]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}>
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
      <View style={styles.choiceContainer}>
        <TouchableOpacity
          style={styles.choice}
          onPress={() => setSingle(!single)}>
          <Text style={{color: 'white'}}>SINGLE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choice}
          onPress={() => setDouble(!double)}>
          <Text style={{color: 'white'}}>TWO PART</Text>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center'}}>
        {joke}
      </Text>
      <Text style={{textAlign: 'center', marginTop: 20}}>{punch}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  choice: {
    width: '40%',
    height: '50%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default joke;
