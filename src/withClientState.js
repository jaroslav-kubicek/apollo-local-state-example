import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';

export const query = gql`
  query getTodos {
    todos @client {
      message
      title
    }
  }
`;

export const mutation = gql`
  mutation addTodo($message: String, $title: String) {
    addTodo(message: $message, title: $title) @client
  }
`;

const update = (query, updater) => (_, variables, { cache }) => {
  let cachedData = { todos: [] };

  try {
    // readQuery fails when mutation is executed before query
    cachedData = cache.readQuery({ query, variables })
  } catch (e) {
    console.log(e);
  }

  const data = updater(cachedData, variables);
  // cache.write(data) is coming
  cache.writeQuery({ query, variables, data });
  return null;
};

export default withClientState({
  Query: {
    todos: () => [],
  },
  Mutation: {
    addTodo: update(query, ({ todos }, { message, title }) => ({
      todos: todos.concat([{ message, title, __typename: 'Todo' }]),
    })),
  },
});