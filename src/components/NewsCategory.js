import React from 'react';
import CustomSlider from './CustomSlider'; // Update the path accordingly

const NewsCategory = ({ articles, category }) => {
  return <CustomSlider itemsToShow={3} data={articles} category={category}/>;
};

export default NewsCategory;
