import React from 'react';
import KanbanContainer from 'containers/KanbanContainer';
import GlobalStyle from 'components/global-style/GlobalStyle';
import { Provider } from 'react-redux';
import store from 'store/store';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo';

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <GlobalStyle />
      <KanbanContainer />
    </Provider>
  </ApolloProvider>
);

export default App;
