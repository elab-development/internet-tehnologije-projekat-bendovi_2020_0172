import logo from './logo.svg';
import './App.css';
import Pocetna from './Komponente/Pocetna';
import BandsTable from './Komponente/BandsTable';
import AboutUs from './Komponente/AboutUs';

function App() {
  return (
    <div className="App">
      <Pocetna></Pocetna>
      <BandsTable></BandsTable>
      <AboutUs></AboutUs>
    </div>
  );
}

export default App;
