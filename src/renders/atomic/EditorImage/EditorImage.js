import React, { Component } from 'react'
import styles from './EditorImage.scss'
import { IconCustom, Cropp } from '@features'
import { Modal } from 'antd'

export default class EditorImage extends Component {
  constructor (props) {
    super(props)
    this.removeImag = this.removeImag.bind(this)
    this.state = {
      croppVisiable: false,
      croppData: null
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.setData = this.setData.bind(this)
  }

  handleOk () {
    if (this.state.croppData) {
      var param = {
        url: this.props.src,
        x: this.state.croppData.x,
        y: this.state.croppData.y,
        w: this.state.croppData.width,
        h: this.state.croppData.height
      }
    /*   imageCropBackend(param).then(res => {
        let blockKey = this.props.all.block.getKey()
        let entityKey = this.props.all.block.getEntityAt(0)
        let entity = this.props.all.contentState.getEntity(entityKey)
        let data = Object.assign({}, entity.data)
        data.src = res.url
        var newContentState = this.props.all.contentState.mergeEntityData(
          entityKey,
          data
        )
        let newState = EditorState.createWithContent(newContentState, decorator)
        this.props.all.blockProps.croppDone(newState, blockKey)
        this.setData(null)
        this.setState({
          croppVisiable: false
        })
      }) */
    } else {
      this.setState({
        croppVisiable: false
      })
    }
  }

  handleCancle () {
    this.setState({
      croppVisiable: false
    })
    let blockKey = this.props.all.block.getKey()
    this.props.all.blockProps.croppDone(null, blockKey)
  }

  showTheCropp () {
    this.props.all.blockProps.onStartEdit(this.props.all.block)
    this.setState({
      croppVisiable: true
    })
  }

  removeImag (all) {
    this.props.all.blockProps.onclose(all)
  }

  setData (data) {
    this.setState({
      croppData: data
    }, () => {
      console.log(this.state.croppData)
    })
  }

  render () {
    let { dispatch, ...rest } = this.props
    return <div className={styles.editorImage}>
      <Modal
        title={'裁剪图片'}
        visible={this.state.croppVisiable}
        onOk={this.handleOk}
        onCancel={this.handleCancle}
        maskClosable={false}
        destroyOnClose
      >
        <Cropp
          src={this.props.src}
          croppVisiable={this.state.croppVisiable}
          setData={this.setData}
          ratio={NaN}
          minCropBoxWidth={0}
          minCropBoxHeight={0}
        />
      </Modal>
      <IconCustom
        content='&#xe693;'
        style={{ fontSize: '20px' }}
        className={styles.closeImage}
        onClick={(e) => {
          this.removeImag(this.props.all)
        }}
      />
      <div
        className={styles.cropIcon}
      >
        <IconCustom
          content='&#xe65a;'
          onClick={e => {
            this.showTheCropp()
          }}

        />
      </div>
      <img src={this.props.src} style={{ width: '100%' }}
        onError={(e) => {
          dispatch({
            type: 'writingpage/brokenSend',
            payload: {
              title: '图片挂了',
              content: {
                'msgtype': 'text',
                'text': {
                  'content': { src: this.props.src }
                }
              }
            }
          })
        }}
      />
    </div>
  }
}
