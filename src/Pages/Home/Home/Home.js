import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {
  useTitle('Home')
    return (
        <div>
          <Banner></Banner> 
          <Categories></Categories> 
        </div>
    );
};

export default Home;