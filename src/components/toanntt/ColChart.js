import React, { useState } from 'react';
import { Column } from '@ant-design/plots';
import { Button } from 'antd';

const ColChart = ({ ansData }) => {
  // const [data, setData] = useState([
  //   {
  //     type: 'A',
  //     num: 38
  //   },
  //   {
  //     type: 'B',
  //     num: 52
  //   },
  //   {
  //     type: 'C',
  //     num: 61
  //   },
  //   {
  //     type: 'D',
  //     num: 145
  //   }
  // ]);
  const data = ansData;
  console.log('data chart: ', data);

  //   const data = [
  //     {
  //       type: 'A',
  //       num: 38
  //     },
  //     {
  //       type: 'B',
  //       num: 52
  //     },
  //     {
  //       type: 'C',
  //       num: 61
  //     },
  //     {
  //       type: 'D',
  //       num: 145
  //     }
  //   ];
  const config = {
    data,
    xField: 'type',
    yField: 'num',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: 'type alias'
      },
      num: {
        alias: 'num alias'
      }
    }
  };
  const resetData = () => {
    const newArr = [...data]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.

    console.log('data[0].num: ', data[0].num);
    newArr[0].num = data[0].num + 5; // replace e.target.value with whatever you want to change it to

    // setData([...newArr]);
  };
  return (
    <>
      <Column {...config} height={300} />
      <Button onClick={resetData}>Change Data</Button>
    </>
  );
};

export default ColChart;
