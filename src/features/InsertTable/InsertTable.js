import React, { Component } from 'react'
import { Table, Input, Button, Popconfirm, Form, Modal, message, Tooltip} from 'antd'
import PropTypes from 'prop-types'
import './InsertTable.scss'
import { IconCustom } from '@features'

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false
  }

  componentDidMount () {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true)
    }
  }

  componentWillUnmount () {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true)
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  handleClickOutside = (e) => {
    const { editing } = this.state
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save()
    }
  }

  save = () => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  render () {
    const { editing } = this.state
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} 是必需的.`
                      }],
                      initialValue: record[dataIndex]
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className='editable-cell-value-wrap'
                    style={{ paddingRight: 24, minHeight: 24, height: 'auto', cursor: 'pointer' }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              )
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    )
  }
}

class InsertTable extends React.Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '车型',
      dataIndex: 'car',
      width: 600,
      editable: true
    }, {
      title: '售价',
      dataIndex: 'price',
      width: 300,
      editable: true
    }, {
      title: '操作',
      width: 50,
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm okText='确认' cancelText='取消' title='确定删除吗?' onConfirm={() => this.handleDelete(record.key)}>
                <a href='javascript:;'>删除</a>
              </Popconfirm>
            ) : null
        )
      }
    }]

    this.state = {
      dataSource: [],
      count: 0,
      title: '',
      visible: false
    }
  }


  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }

  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      car: '',
      price: ''
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    })
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    this.setState({ dataSource: newData })
  }

  submit = () => {
    const { handleOk } = this.props
    let { dataSource, title } = this.state
    
    if (dataSource.length === 0) {
      message.info('请为表格添加数据')
      return
    }
    if (title === '') {
      message.info('请撰写标题')
      return
    }
    let newData = dataSource.map((item) => {
      let array = []
      let itemData = Object.keys(item).filter((item) => item !== 'key')
      itemData.forEach((item_) => {
        array.push({
          width: 1,
          type: 'text',
          text: item[item_]
        })
      })
      return array
    })
    newData.unshift([{
      text: '车型',
      width: 1
    }, {
      text: '售价',
      width: 1
    }])
    newData.unshift([{
      text: title,
      type: 'title',
      width: 2
    }])
    let param = {
      type: 'table',
      obj: {
        data: newData
      }
    }
    this.props.features.insertTable(this.props.editorState, param)
    this.setState({
      dataSource: [],
      count: 0,
      title: '',
      visible: false
    })
  }

  cancel = () => {
    this.setState({
      dataSource: [],
      count: 0,
      title: '',
      visible: false
    })
  }

  render () {
    const { dataSource, title } = this.state
    const { plateform } = this.props
    
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      }
    })
    const Header = () => <Input
      style={{
        border: 'none'
      }}
      value={title}
      onChange={(e) => {
        this.setState({
          title: e.target.value
        })
      }}
      placeholder='请输入表格标题' />
    return (
      <Tooltip placement="top" title="表格">
      <div>
        <Modal
        width={800}
        visible={this.state.visible}
        onOk={this.submit}
        onCancel={this.cancel}
        okText='确认'
        cancelText='取消'
      >
        <Button onClick={this.handleAdd} type='primary' style={{ marginBottom: 16 }}>
          添加行
        </Button>
        <Table
          title={Header}
          size='small'
          pagination={false}	
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </Modal>
      {
        plateform.indexOf('ADDTABLE') != -1
          ? <IconCustom content='&#xe6ca;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.setState({
                visible: true
              })
            }}
          />
          : ''
      }
      </div>
      </Tooltip>
    )
  }
}

InsertTable.propTypes = {
  editorState: PropTypes.object,
  features:  PropTypes.object,
  plateform: PropTypes.array
}

export default InsertTable

