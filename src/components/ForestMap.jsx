import React, { useState, useEffect } from 'react';
import { Button, Space } from "antd";
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";
import NFTForestTable from './NFTForestTable';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line
mapboxgl.accessToken = "pk.eyJ1Ijoic3Rha2VzaGFyZSIsImEiOiJjbDNqZHg4ZTExdjJ2M2pyc29qYW1sd3h2In0.wGS3kVEj1v6o6TN1gVSTsw";

const carbonList = [
  {
    id: '2',
    treeId: '0',
    CO2credit: '0.25',
    year: '2021'
  }
]

function ForestMap() {
  const { Moralis } = useMoralis();

  const [lng, setLng] = useState(-107.6089 );
  const [lat, setLat] = useState(42.3024);
  const [zoom, setZoom] = useState(5);
  const [forest, setForest] = useState([]);

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
    const res = await fetch(`https://api.covalenthq.com/v1/80001/address/${walletAddress}/balances_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}`);
    const { data } = await res.json();
    const treesList = data.items[1].nft_data;

    let list = [{
      key: "0",
      treeType: "Maple",
      tokenId: "0",
      dateOfPlanting: "2/18/2021 9:25:59 PM",
      estimatedCO2Aborption: "1"
    }];

    treesList.map(async (t) => {
      const { data } = await axios.get("https://gateway.pinata.cloud/ipfs/" + t.cid);
      console.log(data);
      data.tokenId = t.tokenId;
      data.estimatedCO2Aborption = t.estimatedCO2Aborption;
      list.push(data);

      new mapboxgl.Marker()
      .setLngLat(data.location)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<h1>${data.treeType}</h1>`
          )
      )
      .addTo(map);
      console.log(data);
      console.log(list);
      setForest([...list]);
    })
  }

  const treesColumns = [
    {
      title: "Name",
      dataIndex: "treeType",
      key: "treeType",
    },
    {
      title: "Tree ID",
      dataIndex: "treeId",
      key: "treeId",
    },
    {
      title: "Tree Planted",
      dataIndex: "dateOfPlanting",
      key: "dateOfPlanting",
    },
    {
      title: "CO2 Absorption per Tree",
      key: "estimatedCO2Aborption",
      render: (text, record) => (
        <Space size="middle">
          <span>{record.estimatedCO2Aborption} ton/year</span>
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'nftid',
      key: 'nftid',
      render: text => (
        <Space size="middle">
          <Button type="primary" className="primary-bg-color" disabled>
            Claim
          </Button>
        </Space>
      ),
    },
  ];

  const carbonColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tree ID",
      dataIndex: "treeId",
      key: "treeId",
    },
    {
      title: "CO2 Credit",
      key: "CO2credit",
      render: (text, record) => (
        <Space size="middle">
          <span>{record.CO2credit} ton/year</span>
        </Space>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
  ];

  const forestData = forest?.map((item, index) => ({
    key: index,
    treeType: item.treeType,
    treeId: item.tokenId,
    dateOfPlanting: item.dateOfPlanting,
    estimatedCO2Aborption: item.estimatedCO2Aborption
  }));

  const carbonData = carbonList?.map((item, index) => ({
    key: index,
    id: item.id,
    treeId: item.treeId,
    CO2credit: item.CO2credit,
    year: item.year
  }));

  return (
    <div className='map-container'>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div id='map'></div>
      <br />
      <NFTForestTable
        name="My Forest"
        columns={treesColumns}
        data={forestData} />
      <NFTForestTable
        name="Carbon Credit NFT"
        columns={carbonColumns}
        data={carbonData} />
    </div>
  )
}

export default ForestMap;