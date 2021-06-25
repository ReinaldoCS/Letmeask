import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import Rooms from './pages/Room';
import NewRome from './pages/NewRoom';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRome} />
          <Route path="/rooms/:id" component={Rooms} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
