import React from "react";
import { Table, Space } from "antd";

const styles = {
  table: {
    margin: "0 auto",
    width: "1000px",
  },
};

function NFTForestTable({ forest }) {
  const columns = [
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
  ];

  const data = forest?.map((item, index) => ({
    key: index,
    treeType: item.treeType,
    treeId: item.tokenId,
    dateOfPlanting: item.dateOfPlanting,
    estimatedCO2Aborption: item.estimatedCO2Aborption
  }));

  return (
    <>
      <div>
        <div style={styles.table}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
}

export default NFTForestTable;