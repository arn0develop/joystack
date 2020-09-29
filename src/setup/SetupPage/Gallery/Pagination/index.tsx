import React from 'react'
import { Pagination as AntdPagination } from 'antd'
import 'src/setup/SetupPage/Gallery/Pagination/style.scss'

export default class Pagination extends React.Component {
  render() {
    return (
      <div className="pagination-content">
        <AntdPagination total={60} showSizeChanger={false} />
      </div>
    )
  }
}