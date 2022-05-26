import React, { useState, useEffect } from 'react';
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line
mapboxgl.accessToken = "pk.eyJ1Ijoic3Rha2VzaGFyZSIsImEiOiJjbDNqZHg4ZTExdjJ2M2pyc29qYW1sd3h2In0.wGS3kVEj1v6o6TN1gVSTsw";

function ForestMap() {
  const { Moralis } = useMoralis();

  const [lng, setLng] = useState(-107.6089 );
  const [lat, setLat] = useState(42.3024);
  const [zoom, setZoom] = useState(5);

  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);


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

    loadNFT(map);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadNFT(map) {
    const getTreeCountOptions = {
      contractAddress: marketAddress,
      functionName: "treeIds",
      abi: contractABIJson,
    };
    
    const totalTreeNFTs = await Moralis.executeFunction(getTreeCountOptions);
    console.log(totalTreeNFTs);

    const treeOptions = {
      contractAddress: marketAddress,
      functionName: "fetchUserTreeNFTs",
      abi: contractABIJson,
      params: {
        _userAddress: walletAddress
      }
    };
    
    const treesList = await Moralis.executeFunction(treeOptions);
    console.log(treesList);

    treesList.map(async (t) => {
      const { data } = await axios.get("https://gateway.pinata.cloud/ipfs/" + t.cid);
      console.log(data);
      new mapboxgl.Marker()
      .setLngLat(data.location)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<h1>${data.treeType}</h1>`
          )
      )
      .addTo(map);
    })
  }

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