import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, Typography, Button } from 'antd';
import { SmileOutlined, GlobalOutlined, SolutionOutlined, DollarCircleOutlined } from '@ant-design/icons';

import HomeImg from '../assets/home-img.png';

const styles = {
  Landing: {
    WebkitBoxPack: "start",
    margin: "0 auto",
    maxWidth: "1000px",
  },
};

function Landing() {
  const history = useHistory();

  return <div style={styles.Landing}>
    <Row gutter={16}>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }}>
        <Typography.Title style={{ marginTop: '3rem', marginBottom: 0}}>
          Build Your Forest 
        </Typography.Title>
        <h2>Buy Trees</h2>
        <h2>Earn CO2 Credits</h2>
        <br />
        <Button className="primary-bg-color" type="primary" size="large" onClick={() => history.push('/NFTMarketPlace')}>
          Get STARTED
        </Button>
      </Col>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }}>
        <center>
          <img src={HomeImg} alt="Home" width={300}/>
        </center>
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <Row gutter={16}>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }} lg={{ span: 6}}>
        <Card>
          <center>
            <SmileOutlined style={{ fontSize: '3rem'}} />
            <h2>
              Innovative
            </h2>
            <p>Each tree is an NFT.  You own it and earn CO2 credit as NFT annualy.</p>
          </center>
        </Card>
      </Col>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }} lg={{ span: 6}}>
        <Card>
          <center>
            <GlobalOutlined style={{ fontSize: '3rem'}} />
            <h2>Reduce CO2</h2>
            <p>We need more forests to capture carbon and combat climate change.</p>
          </center>
        </Card>
      </Col>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }} lg={{ span: 6}}>
        <Card>
          <center>
            <SolutionOutlined style={{ fontSize: '3rem'}} />
            <h2>Biodiversity</h2>
            <p>Your trees fosters a vibrant ecosystems for wildlife.</p>
          </center>
        </Card>
      </Col>
      <Col className="gutter-row" xs={{ span: 32 }} md={{ span: 12 }} lg={{ span: 6}}>
        <Card>
          <center>
            <DollarCircleOutlined style={{ fontSize: '3rem'}} />
            <h2>Rewarding</h2>
            <p>Once carbon contribution of your trees decline, it's cut for timber -  All the profit goes to you.</p>
          </center>
        </Card>
      </Col>
    </Row>
  </div>;
}

export default Landing;