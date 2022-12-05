import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { MyPresentList } from './mock';
import { getNotNullList } from '../../utils';
import PresentCard from '../../components/PresentCard';

const PresentListPage = () => {
  const [presents, setPresents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setPresents(MyPresentList);
  });

  const handleClickCard = (id) => {
    console.log('click card: ', id);
    navigate(`/toan/presentation/preview/${id}`, { replace: true });
  };

  const presentCardList = getNotNullList(presents).map((present) => (
    <Col span={8}>
      <PresentCard key={present.id} content={present} handleClick={handleClickCard} />
    </Col>
  ));

  return (
    <MainLayout>
      <section className='courses container'>
        <Link className='btn' to='/presentation/create'>
          Create presentation
        </Link>
        <br />
        <h1 className='heading' span={12}>
          Presentation List
        </h1>
        <Row gutter={[16, 16]}>{presentCardList}</Row>
      </section>
    </MainLayout>
  );
};
export default PresentListPage;
