import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const CategoriesTabs = ({ heading, dummyData }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(dummyData);
    if (dummyData.length > 0) {
      setActiveTab(dummyData[0].id);
    }
  }, [dummyData]);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <div
        className="mx-auto flex w-[85%] flex-col items-center justify-between py-10"
        id="project-scroll"
      >
        <ul className="flex flex-wrap justify-center">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(category.id);
              }}
              className={`duration-400 pointer relative max-w-full flex-1 whitespace-nowrap border border-b-white border-e-white px-8 py-4  text-center font-poppins text-sm font-semibold text-black transition-all  sm:px-12 sm:py-5 sm:text-base 
                lg:max-w-max xl:border-b-0
                ${activeTab === category.id ? 'bg-white' : 'bg-gray-200'} ${
                activeTab === category.id
                  ? 'after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:scale-x-100 after:transform after:bg-gray-800'
                  : 'after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:scale-x-0 after:transform after:bg-gray-800'
              }`}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

CategoriesTabs.propTypes = {
  heading: PropTypes.string.isRequired,
  dummyData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoriesTabs;
