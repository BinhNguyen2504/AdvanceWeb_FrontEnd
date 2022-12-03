import { Column } from '@ant-design/plots';
import { Row } from 'antd';

const ReportSlide = () => {
  const data = [
    {
      type: 'A',
      answers: 2
    },
    {
      type: 'B',
      answers: 5
    },
    {
      type: 'C',
      answers: 3
    },
    {
      type: 'D',
      answers: 1
    }
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'answers',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1
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
        alias: '类别'
      },
      answers: {
        alias: 'Answers'
      }
    }
  };
  return (
    <Row>
      <Column {...config} />
    </Row>
  );
};

export default ReportSlide;
