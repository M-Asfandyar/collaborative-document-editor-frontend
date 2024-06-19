import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationProvider';
import DocumentsPage from './pages/DocumentsPage';
import DocumentEditorPage from './pages/DocumentEditorPage';
import Login from './components/Login';
import Register from './components/Register';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <NavigationProvider>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
              <Route path="/documents/:id" element={<ProtectedRoute><DocumentEditorPage /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </AuthProvider>
      </NavigationProvider>
    </Router>
  );
}

export default App;
