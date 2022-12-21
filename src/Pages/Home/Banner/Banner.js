import React from 'react';
 import img1 from '../../../Assests/Images/banner3.jpg'
 import img2 from '../../../Assests/Images/banner2.jpg'
 import img3 from '../../../Assests/Images/banner1.jpg'
 import img4 from '../../../Assests/Images/banner4.jpg'
 import img5 from '../../../Assests/Images/banner-2.jpg'
import BannerItem from './BannerItem';

const bannerData = [
    {
        image: img1,
        prev: 5,
        id: 1,
        next: 2,
        headline: 'Ford',
        
    },
    {
        image: img2,
        prev: 1,
        id: 2,
        next: 3,
        headline: 'Nissan',
      
    },
    {
        image: img3,
        prev: 2,
        id: 3,
        next: 4,
        headline: 'BMW',
    },
    {
        image: img4,
        prev: 3,
        id: 4,
        next: 5,
        headline: 'Toyeta',
        
    },
    {
        image: img5,
        prev: 4,
        id: 5,
        next: 1,
        headline: 'Axela',
        
    },
   
]
const Banner = () => {
    return (
        <div className="carousel w-1/2 h-1/2 mx-auto py-10">
        {
            bannerData.map(slide => <BannerItem
                key={slide.id}
                slide={slide}
            ></BannerItem>)
        }
        
    </div>
    );
};

export default Banner;