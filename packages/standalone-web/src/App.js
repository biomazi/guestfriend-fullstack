import React from 'react';
import KanbanContainer from 'containers/KanbanContainer';
import GlobalStyle from 'components/global-style/GlobalStyle';
import { Provider } from 'react-redux';
import store from 'store/store';

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <KanbanContainer />
  </Provider>
);

export default App;
