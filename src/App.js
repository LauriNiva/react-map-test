import './App.css';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Marker,
} from 'react-leaflet';
import { useState } from 'react';


function App() {
  const fakeData = {
    owner: 'Matti Meikäläinen',
    tila: 'Kirjattu',
    kuvaus: 'Kuoppa tiessä',
    osasto: 'Tielaitos',
    images: [],
  };
  const [clickedLocations, setClickedLocations] = useState([]);

  const MapClickComponent = () => {

    console.log('clickedLocations', clickedLocations)

    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        setClickedLocations(clickedLocations.concat([[e.latlng.lat, e.latlng.lng]]));
      },
    });
  };


  return (
    <div className="App">
      <h1>Map</h1>
      <MapContainer
        center={[64.07391245239761, 24.53362472782081]}
        zoom={20}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickComponent />
        {clickedLocations.map(location => <Marker key={location[0]} position={location} />)}
      </MapContainer>
    </div>
  );
}

export default App;
