import { Modal, Tabs, Input } from 'antd'
import React, { Component } from 'react'
import { IconCustom } from '../../features'
const TabPane = Tabs.TabPane

class AddLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visiable: false,
      link: ''
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onSetLink = this.onSetLink.bind(this)
    this.editLink = this.editLink.bind(this)
  }

  showModal () {
    this.setState({
      visiable: true
    })
  }

  closeModal () {
    this.setState({
      visiable: false
    })
  }

  onSetLink () {
    this.setState({
      visiable: false
    })
    this.props.features.addLink(this.props.editorState, this.state.link)
  }

  editLink (link) {
    this.setState({
      link: link
    })
  }

  render () {
    let { editorState, features, plateform } = this.props
    return <div>
      <Modal
        visible={this.state.visiable}
        onCancel={this.closeModal}
        onOk={this.onSetLink}
      >
        <Tabs defaultActiveKey='1' >
          <TabPane tab='添加链接' key='1'>
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
        plateform.indexOf('ADDLINK') != -1
          ? <IconCustom content='&#xe89e;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.showModal()
            }}
          /> : ''
      }
    </div>
  }
}

export default AddLink
