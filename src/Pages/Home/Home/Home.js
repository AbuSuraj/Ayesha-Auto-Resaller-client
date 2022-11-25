import React, { useContext } from 'react';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {
  const {loading} = useContext(AuthContext)
  useTitle('Home')
  if(loading){<Loading></Loading>}
    return (
        <div>
          <Banner></Banner> 
          <Categories></Categories> 
        </div>
    );
};

export default Home;