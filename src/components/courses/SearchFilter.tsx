import React, { useState, useEffect } from 'react';
import { Drawer, Button, Radio } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { debounce } from 'lodash';

interface SearchFilterProps {
  filters: Filters[];
  selectedFilter?: string;
  onChange: (value: string) => void;
}

export interface Filters {
  options: { label: string, value: string }[];
  title: string;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onChange, selectedFilter }) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [currentFilter, setCurrentFilter] = useState(selectedFilter ?? "");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debouncedOnChange = debounce(onChange, 800);

  const handleClearFilters = () => {
    setCurrentFilter(""); // Reset the current filter
    debouncedOnChange(""); // Notify parent component
  };

  const handleFilterChange = (value: string) => {
    setCurrentFilter(value); // Update the current filter
    debouncedOnChange(value); // Notify parent component
  };

  const renderFilters = () => (
    <div className='sticky-sider top-0 relative'>
      {filters.map((section) => (
        <div key={section.title} className="mb-6">
          <div className='mb-4 flex items-center'>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <button
              className='italic text-orange-600 text-xs absolute -right-2'
              onClick={handleClearFilters} // Clear filters when button is clicked
            >
              Clear Filters
            </button>
          </div>
          <Radio.Group
            className="flex flex-col space-y-2"
            value={currentFilter} // Bind to the current filter state
            onChange={(e) => handleFilterChange(e.target.value)} // Handle filter change
          >
            {section.options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      ))}
    </div>
  );

  return isMobile ? (
    <div className='absolute top-[70px] left-1/2 sm:left-auto sm:transform-none transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 sm:-top-2 sm:right-4'>
      <Button
        type="primary"
        icon={<FilterOutlined />}
        onClick={() => setVisible(true)}
        className="mb-4 font-jost view-button ant-btn-variant-solid"
      >
        Filters
      </Button>
      <Drawer
        title="Filters"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        width={300}
      >
        {renderFilters()}
      </Drawer>
    </div>
  ) : (
    <Sider width={250} theme="light" className="p-4">
      {renderFilters()}
    </Sider>
  );
};
