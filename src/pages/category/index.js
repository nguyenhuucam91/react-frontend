
import { Table, Typography } from 'antd'
import { useAsync } from '@umijs/hooks';
import categoryService from '@/services/categoryService';
import { useState } from 'react';
import { router } from 'umi';
import { routes } from '@/constants/routes';
import queryString from 'query-string'

const { Title } = Typography

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => {}
  }
]

export default function() {

  document.title = "Categories"

  const [page, setPage] = useState(queryString.parse(window.location.search).page || 1)
  const [perpage, setPerpage] = useState(queryString.parse(window.location.search).perpage || 10)

  const { data, loading } = useAsync(() => categoryService.all({page, perpage}), [page])

  const categories = data && data.success ? data.data.data : []
  const total = data && data.success ? data.data.meta.total : 0

  const onChange = (page, pageSize) => {
    setPage(page)
    setPerpage(pageSize)
    router.push({
      pathname: routes.api.paths.category.all,
      query: {
        page,
        perpage: pageSize
      }
    })
  }

  return (
    <>
      <Title level={2} className="title-heading">Categories</Title>
      <div className="main-content">
        <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          pageSize: parseInt(perpage),
          current: parseInt(page),
          onChange
        }}/>
      </div>
    </>
  );
}
