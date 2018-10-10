import { Button, Modal, Icon, message, Spin } from 'antd'
import React, { Component } from 'react'
import './UploadCover.css'
import { uuid } from '../../index'
import { IconCustom } from '../../features'

class UploadCover extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cover: '',
      visiable: false,
      uploadTime: false
    }
    this.show = this.show.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }

  show () {
    this.setState({
      visiable: true
    })
  }

  handleOk () {
    this.setState({
      visiable: false
    })
  }

  handleCancle () {
    this.setState({
      visiable: false,
      uploadTime: false
    })
  }

  render () {
    let { addImage, index, style, corver_image, uploadFile, deleteCover } = this.props
    let uid = uuid(8, 16)
    return <div style={style}>
      <div style={corver_image && corver_image != '' ? { marginTop: '16px', height: '150px' } : { marginTop: '16px', height: '0px' }} className='coverBox'>
        {
          corver_image && corver_image != ''
            ? <IconCustom content='&#xe693;' className='close' onClick={(e) => { deleteCover(index) }} /> : ''
        }
        {
          corver_image && corver_image != ''
            ? <img src={corver_image} style={{ width: '100%', height: '100%', marginRight: '16px' }} /> : ''
        }
      </div>
      <Modal
        visible={this.state.visiable}
        onOk={this.handleOk}
        onCancel={this.handleCancle}
      >
        <div>
          <input
            style={{ display: 'none' }}
            type='file'
            name='file'
            id={'uid' + uid}
            accept='image/*'
            onChange={(e) => {
              let file = e.target.files
              let files = file[0]
              let img = new Image()
              img.onload = () => {
                if (img.width < 750 || img.height < 420) {
                  message.warning('请上传尺寸不小于750*422px的图片')
                  return null
                } else {
                  this.setState({
                    uploadTime: true
                  })
                  let formData = new FormData()
                  formData.append('file', files)
                  uploadFile(formData).then(res => {
                    this.setState({
                      uploadTime: false
                    })
                    message.success('封面图上传成功')
                    addImage(res.url, index)
                  })
                }
              }
              img.src = window.URL.createObjectURL(file[0])
              document.getElementById('uid' + uid).value = ''
            }}
          />
          <label htmlFor={'uid' + uid}>
            <Spin spinning={this.state.uploadTime}>
              <div className='imageBox'>
                {
                  corver_image && corver_image != ''
                    ? <img src={corver_image} style={{ height: '100px', width: '100px', marginRight: '16px' }} /> : ''
                }
                <div className='uploadButton'>
                  <Icon type='plus' />
                  <div className='ant-upload-text'>Upload</div>
                </div>
              </div>
            </Spin>
          </label>
          <p>请上传尺寸不小于750*422px的图片</p>
        </div>
      </Modal>
      <Button type='primary'
        style={{marginTop: '5px'}}
        onClick={() => {
          this.show()
        }}
      >添加封面图</Button>
    </div>
  }
}

export default UploadCover
