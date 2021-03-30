import React from 'react';
import style from 'styled-components';
import FavoriteItem from './FavoriteItem'

const FavoritesContent = () => {

    const favorites = [{id:"10014100",name:"hibiskus",unit:100,price:150,amount:1,image:"https://i.ibb.co/CvKPD3f/hibiskus-3-min.jpg",stock:400}, {id:"10014100",name:"hibiskus",unit:100,price:150,amount:1,image:"https://i.ibb.co/CvKPD3f/hibiskus-3-min.jpg",stock:400}];

    return <Wrapper className="section section-center">
                {favorites.map(item => {
                    return <FavoriteItem {...item}/>
                }) }
            </Wrapper>;
}

const Wrapper = style.section`

`;

export default FavoritesContent;