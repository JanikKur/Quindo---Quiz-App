import {BrowserRouter as Router} from 'react-router-dom';
import RoutesComp from './components/RoutesComp';
import { UserProvider } from './contexts/UserContext';
import Navigation from './layouts/Navigation';

export default function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Navigation/>
          <RoutesComp/>
        </UserProvider>
      </Router>
    </div>
  );
}