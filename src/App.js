import './App.css';
import { MovieList } from './components/MovieList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MovieList />
    </div>
  );
}

export default App;
