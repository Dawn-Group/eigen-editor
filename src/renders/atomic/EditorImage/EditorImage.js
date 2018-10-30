import React, { Component } from 'react'
import styles from './EditorImage.scss'
import { IconCustom, Cropp } from '@features'
import {
  EditorState
} from 'draft-js'
import { decorator } from '@renders/decorators'
import  imageCropBackend  from "@utils/imageCropBackend";
import { Modal, Input } from 'antd'
import { isOriginal } from '../../../utils/common'

export default class EditorImage extends Component {
  constructor (props) {
    super(props)
    this.removeImag = this.removeImag.bind(this)
    this.state = {
      croppVisiable: false,
      croppData: null,
      imageText: null,
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.setData = this.setData.bind(this)
  }

  handleOk () {
    if (this.state.croppData) {
      var param = {
        url: this.props.data.src,
        x: this.state.croppData.x,
        y: this.state.croppData.y,
        w: this.state.croppData.width,
        h: this.state.croppData.height
      }

      let { cropImageLink } = this.props.blockProps
      console.log(cropImageLink(), "fck")
      imageCropBackend(cropImageLink(), param).then(res => {
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
      })
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

  componentDidMount() {
    this.setState({
      imageText: this.props.data.text
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
          src={this.props.data.src}
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
      {
        isOriginal(this.props.data.src) && <div
        className={styles.markIcon}
      >
        <div>原文图片</div>
      </div>
      }
      <img src={this.props.data.src} style={{ width: '100%' }}
        onError={(e) => {
          console.error(e)
          /* dispatch({
            type: 'writingpage/brokenSend',
            payload: {
              title: '图片挂了',
              content: {
                'msgtype': 'text',
                'text': {
                  'content': { src: this.props.data.src }
                }
              }
            }
          }) */
        }}
      />
      <div className={styles.imageTitle} >
        <input
          onFocus={() => {  
            const { blockProps, block } = this.props
            const { onStartEdit } = blockProps
            onStartEdit(block)
          }}
          onBlur={() => {
            let blockKey = this.props.block.getKey()
            this.props.blockProps.croppDone(null, blockKey)
          }}
          className={styles.picInput}
          onChange={(e) => {
            this.setState({
              imageText: e.target.value
            })
          }}
          value={this.state.imageText ? this.state.imageText : ''}
          style={{ width: this.state.imageText ? this.state.imageText.length * 10 : 0 }} />
      </div>
    </div>
  }
}
