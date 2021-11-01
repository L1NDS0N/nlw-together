import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Home /> */}
      <NewRoom />
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
