import { Tabs, Modal, Input, message, Spin } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '@features'
const TabPane = Tabs.TabPane

class InsertSku extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visiable: false,
      link: '',
      loading: false
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.editLink = this.editLink.bind(this)
  }

  handleOk () {
    this.setState({
      visiable: false,
      loading: true
    })
    
    this.props.getSkuData && this.props.getSkuData(this.state.link, (res)=> {
      let url = this.state.link
      this.setState({
        link: '',
        loading: false
      })
      if (res) {
        let param = {
          type: 'sku',
          obj: { type: 'sku', url: url, ...res }
        }
        message.success('sku上传成功')
        this.props.features.inserSku(this.props.editorState, param)
      }
    })
  }

  handleCancle () {
    this.setState({
      visiable: false
    })
  }

  editLink (link) {
    this.setState({
      link: link
    })
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <Spin spinning={this.state.loading}><div>
      <Modal
        visible={this.state.visiable}
        onCancel={this.handleCancle}
        onOk={this.handleOk}
      >
        <Tabs defaultActiveKey='1' >
          <TabPane tab='添加SKU' key='1'>
            <p
              style={{ marginBottom: '20px' }}
            >仅支持淘宝、天猫等阿里巴巴旗下的网站链接（支付宝除外）</p>
            <Input
              onChange={(e) => {
                this.editLink(e.target.value)
              }}
              value={this.state.link}
              addonBefore='链接：'
            />
          </TabPane>
        </Tabs>
      </Modal>
      {

        plateform.indexOf('ADDSKU') != -1
          ? <IconCustom content='&#xe63e;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.setState({
                visiable: true
              })
            }}
          /> : ''
      }
    </div></Spin>
  }
}

export default InsertSku
