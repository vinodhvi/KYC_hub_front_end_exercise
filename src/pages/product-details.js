import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';



// table data taken from ant design
const getProductParams = (params) => ({
  limit: params.pagination?.pageSize,
  skip: (params.pagination?.current - 1) * params.pagination?.pageSize,
  sort: params.sortField && params.sortOrder ? `${params.sortField}_${params.sortOrder}` : undefined,
  filter: params.filters ? qs.stringify(params.filters) : undefined,
  ...params,
});

const ProductDetails = ({ onCompare, isComparePage = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?${qs.stringify(getProductParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ products, total }) => {
        setData(products);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: sorter.order,
      sortField: sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: [
        { text: 'Beauty', value: 'beauty' },
        { text: 'Fragrances', value: 'fragrances' },
        { text: 'Furniture', value: 'furniture' },
        { text: 'Groceries', value: 'groceries' },
      ],
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
      render: (price) => `$${price}`,
      width: '10%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Compare',
      dataIndex: 'Button',
      width: '10%',
      render: (text, product) => (
        <Button
          onClick={() => {
            if (isComparePage) {
              handleCompare(product);
            } else {
              navigate(`/compare-product/${product.title}`, { state: { selectedProducts: [product] } });
            }
          }}
        >
          Compare
        </Button>
      ),
    },
  ];

//  table data taken from ant design

// handle compare for compare button
const handleCompare = (product) => {
    if (typeof onCompare === 'function') {
      onCompare(product);
    } else {
      console.error('onCompare is not a function');
    }
  }; 
// handle compare for compare button
  return (
    <Table
      columns={columns}
      rowKey={(product) => product.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ProductDetails;
