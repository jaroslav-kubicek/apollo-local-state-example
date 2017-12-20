import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withClientState from './src/withClientState';
import AddTodo from './src/components/AddTodo';
import TodoList from './src/components/TodoList';

const client = new ApolloClient({
  link: withClientState,
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'TODOS', style: { color: '#fff' } }}
          />
          <View style={styles.subContainer}>
            <View style={{ flex: 1 }}><TodoList /></View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={40}
              behavior='padding'>
              <AddTodo />
            </KeyboardAvoidingView>
          </View>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(204, 204, 204, 0.5)',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 96, 255, 0.2)',
  }
});
