import React, { Component } from 'react'
import styles from './EditorSku.scss'
import { Modal, Input, Radio, Upload, Icon, Spin } from 'antd'
import {
  EditorState
} from 'draft-js'
import { decorator } from '@renders/decorators'
import { IconCustom, Cropp } from '@features'
import imageCropBackend from "@utils/imageCropBackend";
const RadioGroup = Radio.Group

class EditorSku extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      setLink: this.props.data.sku_images,
      skuTitle: this.props.data.title,
      croppVisiable: false,
      cropLink: '',
      croppData: null,
      loading: false,
      cropploading: false
    }
    this.close = this.close.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.removeSku = this.removeSku.bind(this)
    this.handleCroppOk = this.handleCroppOk.bind(this)
    this.handleCroppCancle = this.handleCroppCancle.bind(this)
    this.showCroppModal = this.showCroppModal.bind(this)
    this.setData = this.setData.bind(this)
    this.handlePostImage = this.handlePostImage.bind(this)
  }

  handleCroppOk () {
    if (this.state.croppData) {
      var param = {
        url: this.state.cropLink,
        x: this.state.croppData.x,
        y: this.state.croppData.y,
        w: this.state.croppData.width,
        h: this.state.croppData.height
      }
      this.setState({
        cropploading: true
      })
      imageCropBackend(param).then(res => {
        let blockKey = this.props.all.block.getKey()
        let entityKey = this.props.all.block.getEntityAt(0)
        let entity = this.props.all.contentState.getEntity(entityKey)
        let data = Object.assign({}, entity.data)
        data.images.push(res.url)
        var modify = {
          images: data.images
        }
        let newState = this.dataModify(modify)
        this.props.all.blockProps.finishChange(newState, blockKey)
        this.setState({
          croppVisiable: false,
          cropLink: '',
          croppData: null,
          cropploading: false
        })
      })
    } else {
      this.setState({
        croppVisiable: false
      })
    }
  }

  handleCroppCancle () {
    this.setState({
      croppVisiable: false,
      cropLink: '',
      croppData: null,
      cropploading: false
    })
  }

  showCroppModal (link) {
    this.setState({
      croppVisiable: true,
      cropLink: link
    })
  }

  setData (data) {
    this.setState({
      croppData: data
    })
  }

  close () {
    this.setState({
      modalVisible: false
    })
    let blockKey = this.props.all.block.getKey()
    this.props.all.blockProps.notChange(blockKey)
  }

  dataModify (param) {
    let blockKey = this.props.all.block.getKey()
    let entityKey = this.props.all.block.getEntityAt(0)
    let entity = this.props.all.contentState.getEntity(entityKey)
    let data = Object.assign({}, entity.data)
    for (let k in param) {
      data[k] = param[k]
    }
    var newContentState = this.props.all.contentState.mergeEntityData(
      entityKey,
      data
    )
    let newState = EditorState.createWithContent(newContentState, decorator)
    return newState
  }

  handleOk () {
    this.setState({
      modalVisible: false
    })
    let blockKey = this.props.all.block.getKey()
    var param = {
      title: this.state.skuTitle,
      sku_images: this.state.setLink
    }
    let newState = this.dataModify(param)
    this.props.all.blockProps.finishChange(newState, blockKey)
  }

  removeSku (all) {
    this.props.all.blockProps.onclose(all)
  }

  handlePostImage (infor) {
    if (infor.file.status === 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (infor.file.status == 'done') {
      this.showCroppModal(infor.file.response.url)
      this.setState({
        loading: false
      })
    }
  }

  render () {
    return <div className={styles.draftsku}
    >
      <IconCustom
        content='&#xe693;'
        style={{ fontSize: '20px' }}
        className={styles.closeSku}
        onClick={(e) => {
          this.removeSku(this.props.all)
        }}
      />
      <Modal
        title={'裁剪图片'}
        visible={this.state.croppVisiable}
        onOk={this.handleCroppOk}
        onCancel={this.handleCroppCancle}
        maskClosable={false}
        destroyOnClose
      >
        <Spin spinning={this.state.cropploading}>
          <Cropp
            src={this.state.cropLink}
            croppVisiable={this.state.croppVisiable}
            setData={this.setData}
            ratio={{
              w: 500,
              h: 500
            }}
            minCropBoxWidth={500}
            minCropBoxHeight={500}
          />
        </Spin>
      </Modal>
      <Modal
        visible={this.state.modalVisible}
        onCancel={this.close}
        maskClosable={false}
        onOk={this.handleOk}
      >
        <div className={styles.ModalContent}>
          <div
            className={styles.ModalContentTitle}
          >编辑宝贝信息</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px'
            }}
          >
            <Input
              value={this.state.skuTitle}
              maxLength={'30'}
              onChange={(e) => {
                this.setState({
                  skuTitle: e.target.value
                })
              }}
              style={{ width: '90%' }}
            />
            <p style={this.state.skuTitle.length > 30 ? { color: 'red' } : {}}>{this.state.skuTitle.length}/30</p>
          </div>
          <RadioGroup
            className={styles.SwitchPanel}
            onChange={(e) => {
              this.setState({
                setLink: e.target.value
              })
            }}
            value={this.state.setLink}
          >
            {
              this.props.data.images
                ? this.props.data.images.map((item, index) => {
                  return <div
                    key={index}
                    className={styles.switchSku}
                    style={{ width: '130px', height: '150px' }}
                  >
                    <Radio className={styles.radioSet}
                      value={item}
                    />
                    <div
                      className={styles.cropIcon}
                    >
                      <IconCustom
                        content='&#xe65a;'
                        className={styles.croppIcon}
                        onClick={e => {
                          this.showCroppModal(item)
                        }}
                      />
                    </div>
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={item}
                      onClick={() => {
                        console.log(item)
                        this.setState({
                          setLink: item
                        })
                      }}
                    />
                  </div>
                }) : ''
            }
          </RadioGroup>
          <div
            style={{ marginTop: '16px' }}
          >{
              <Spin spinning={this.state.loading}>
              <Upload
                  showUploadList={false}
                  action={'/api/v1/upload/images'}
                  onChange={this.handlePostImage}
                >
                  <div className={styles.uploadButton}>
                  <Icon type='plus' />
                  <div className='ant-upload-text'>Upload</div>
                </div>
                </Upload>
            </Spin>
            }
          </div>
        </div>
      </Modal>
      <img src={
        this.props.data.type == 'sku'
          ? this.props.data.sku_images : this.props.data.sku_images}
      />
      <div
        className={styles.dataAdd}
      >
        <p
          onClick={(e) => {
            this.setState({
              modalVisible: true
            })
            this.props.all.blockProps.onStartEdit(this.props.all.block)
          }}
        >点击完善资料</p>
      </div>
      <div
        style={{
          padding: 16
        }}
      >
        <a
          target='_blank'
          href={this.props.data.url}
        >{this.props.data.title}</a>
        <span>￥{this.props.data.price}</span>
      </div>
    </div>
  }
}

export default EditorSku
