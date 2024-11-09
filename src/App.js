import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PersonChores from './components/PersonChores';
import { useChoreData } from './hooks/useChoreData';
import './App.css';

function App() {
  const { choreData, loading } = useChoreData();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <h1>House Chore Tracker</h1>
        <Routes>
          <Route path="/" element={<Home people={choreData.people} />} />
          <Route path="/:name" element={<PersonChores choreData={choreData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
