import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line
mapboxgl.accessToken = "pk.eyJ1Ijoic3Rha2VzaGFyZSIsImEiOiJjbDNqZHg4ZTExdjJ2M2pyc29qYW1sd3h2In0.wGS3kVEj1v6o6TN1gVSTsw";

function ForestMap() {
  const [lng, setLng] = useState(-107.6089 );
  const [lat, setLat] = useState(42.3024);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='map-container'>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div id='map'></div>
    </div>
  )
}

export default ForestMap;