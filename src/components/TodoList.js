import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { graphql } from 'react-apollo';
import { query } from './../withClientState';

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
  }
});

const TodoList = ({ data }) => {
  if (!Array.isArray(data.todos) || data.todos.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No todos available...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {data.todos.map((todo, i) => <ListItem
        key={i}
        title={todo.title}
        subtitle={todo.message}
        hideChevron={true}
        containerStyle={{ backgroundColor: '#ffffff' }}
      />)}
    </ScrollView>
  );
};

export default graphql(query)(TodoList);