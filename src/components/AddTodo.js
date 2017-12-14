import * as React from 'react';
import { graphql } from 'react-apollo';
import { StyleSheet, View, TextInput } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { compose, withStateHandlers } from 'recompose';
import { mutation } from './../withClientState';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 30,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

const AddTodo = (props) => (
    <View style={styles.container}>
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput value={props.title} onChangeText={(text) => props.onChangeText('title', text)} />
      </View>
      <View>
        <FormLabel>Message</FormLabel>
        <FormInput value={props.message} onChangeText={(text) => props.onChangeText('message', text)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          backgroundColor='#1096A8'
          raised
          icon={{name: 'check'}}
          disabled={!(props.title && props.message)}
          onPress={props.onSubmit}
          title='SUBMIT' />
      </View>
    </View>
  );

const options = {
  props: ({ mutate }) => ({
    submit: (title, message) => mutate({ variables: { title, message } })
  })
};

const enhance = compose(
  withStateHandlers(
    { title: '', message: '' },
    {
      onChangeText: (state) => (field, value) => ({ ...state, [field]: value }),
      onSubmit: (state, props) => () => {
        props.submit(state.title, state.message);

        return { title: '', message: '' };
      }
    }
  ),
);

export default graphql(mutation, options)(enhance(AddTodo));