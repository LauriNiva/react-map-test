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

  const [map, setMap] = useState(null);

  const [clickedLocations, setClickedLocations] = useState([]);
  const [canClick, setCanClick] = useState(false);
  console.log('clickedLocations', clickedLocations);

  const MapClickComponent = () => {
    useMapEvents({
      click: (e) => {
        // console.log(e.latlng);
        const center = map.getCenter();
        //console.log('center', center)
        if (canClick) {
          console.log('Add clicked location', e.latlng);
          setClickedLocations(
            //clickedLocations.concat([[center.lat, center.lng]])
            clickedLocations.concat([[e.latlng.lat, e.latlng.lng]])
          );
        }
      },
    });
  };

  return (
    <div className="App">
      <div>
        <button
          className="toggle-button"
          onClick={() => setCanClick(!canClick)}
        >
          {canClick ? 'click ON' : 'click OFF'}
        </button>
        <button
          onClick={() => {
            const center = map.getCenter();
            console.log('Added center location', center);

            setClickedLocations(
              clickedLocations.concat([[center.lat, center.lng]])
            );
          }}
          className="add-button"
        >
          add center
        </button>
      </div>
      <MapContainer
        center={[64.07391245239761, 24.53362472782081]}
        zoom={20}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickComponent />
        <span className="crosshair">+</span>
        {clickedLocations.map((location) => (
          <Marker key={location[0]} position={location}>
            <Popup>
              New marker at <br />
              {location[0]}
              <br />
              {location[1]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
