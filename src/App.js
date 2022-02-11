import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {

  const [coordinate,setCoordinate] = useState([]);
  const [address,setAddress] = useState();
  
  const [lat,setLat] = useState();
  const [lon,setLon] = useState();  
  
  const [showAdr,setShowAdr] = useState();  
  const [showLat,setShowLat] = useState();  
  const [showLon,setShowLon] = useState();  

  let coor;
  let addr;

  function getAdress()
  {
    //split'den sonrası filtreleme için, virgülden sonraki/önceki boşluğu almıyoruz. 
    coor = coordinate.toString().split(",").filter(prm => prm.trim() !== '').map(prm => prm.trim())

    setLat(coor[0]);
    setLon(coor[1]);

    axios.get("https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat="+lat+"&lon="+lon).then((res) => {
      setAddress(res.data.features[0].properties.geocoding.label);
    })

  }

  function getCoordinates()
  {
    addr = address.toString().split(" ")
    
    for(let i=0;i< addr.length;i++)
    {
      setAddress(addr[i] + "+")
    }

    axios.get("https://nominatim.openstreetmap.org/search?q="+ address +"&format=geojson").then((res) => {
      console.log(res.data);
      setShowAdr(res.data.features[0].properties.display_name)
      setShowLat(res.data.features[0].geometry.coordinates[1])
      setShowLon(res.data.features[0].geometry.coordinates[0])
    })

  }

  return (
    <div className="App">

      <div className="coor-to-adr">
        <input 
          onChange={(event) => {
            setCoordinate(event.target.value);
          }} 
          type="text" placeholder='Enter the Coordinates. . .' 
        />

        <button onClick={getAdress}>Get Address</button>

        <div className="card">
          <p>{address}</p>
        </div>  

      </div>

      <div className="adr-to-coor">
        <input 
          onChange={(event) => {
            setAddress(event.target.value);
          }} 
          type="text" placeholder='Enter the Address. . .' 
        />

        <button onClick={getCoordinates} >Get Lat&Lon</button>

        <div className="card">
          <p>{showAdr}</p>
          <p>lat: {showLat}</p>
          <p>lon: {showLon}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
