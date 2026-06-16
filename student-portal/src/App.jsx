import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast/Toast';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <Toast />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
