import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const PresentList = () => (
  <MainLayout>
    <section className='courses container'>
      <Link className='btn' to='/presentation/create'>
        Create presentation
      </Link>
      <br />
      <h1 className='heading' span={12}>
        Presentation List
      </h1>
    </section>
  </MainLayout>
);
export default PresentList;
