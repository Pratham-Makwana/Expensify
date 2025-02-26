import {Provider} from 'react-redux';
import './global.css';
import AppNavigation from './src/navigation/appNavigation';
import {store} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
