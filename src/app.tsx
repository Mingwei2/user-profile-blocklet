import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import NotFound from './components/not-found';
import UserNotFound from './components/user-profile/user-not-found';
import './i18n';
import UserProfile from './pages/user-profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/user/1" />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/user/not-found" element={<UserNotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
