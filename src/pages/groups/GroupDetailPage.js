import { Layout } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useGetListGroupQuery } from '../../app/groupService';

import MainLayout from '../../layouts/MainLayout';

// import { SocketContext } from '../../context/socket';
import { BASE_URL } from '../../constants';
import network from '../../utils/network';

const { Content } = Layout;

const GroupDetailPageOld = () => {
  //   const { data, isLoading } = useGetListGroupQuery();
  //   const socketRef = useRef(useContext(SocketContext));
  //   const location = useLocation();
  //   const gameDataRef = useRef(location.state.game);

  const { groupid } = useParams();
  //   const [groupData, setGroupData] = useState({});

  const getGroupData = async (id) => {
    console.log('network: ', network);
    const data = await network.network.get(`${BASE_URL}/groups/${id}`);
    console.log('network: ', network);
    console.log('group: ', data);
    // return data;
  };

  useEffect(() => {
    getGroupData(groupid);
  }, []);

  return (
    <Content>
      <MainLayout>
        <section className='teachers container'>
          <h1 className='heading'>Group Details</h1>
          <div className='box-container'>
            <div className='box'>
              <div className='tutor'>
                <img src='/img/ava.jpg' alt='' />
                <div>
                  <h3>john deo</h3>
                  <span>developer</span>
                </div>
              </div>
              <a href='teacher_profile.html' className='inline-btn'>
                view profile
              </a>
            </div>
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupDetailPageOld;
