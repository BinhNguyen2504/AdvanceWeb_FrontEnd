import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Content } from 'antd/es/layout/layout';

import MainLayout from '../layouts/MainLayout';
import PresentCard from '../components/PresentCard';
import { useGetListPresentQuery } from '../app/presentationService';

const PresentList = () => {
  const { data, isLoading } = useGetListPresentQuery();
  console.log(data);

  return (
    <Content>
      <MainLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className='courses container'>
            <Link className='btn' to='/presentation/create'>
              Create presentation
            </Link>
            <br />
            <h1 className='heading' span={12}>
              Presentation List
            </h1>

            <Row gutter={[16, 16]}>
              {data.data.map((present) => (
                <Col span={8} key={present._id}>
                  <PresentCard name={present.name} num={present.numberOfQuestion} id={present._id} />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </MainLayout>
    </Content>
  );
};
export default PresentList;
