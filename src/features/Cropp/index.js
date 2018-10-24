import React, { Component } from 'react'
import { Input } from 'antd'
import classnames from 'classnames'
import styles from './Cropp.scss'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

let CROPPER

const CROP_CONTAINER_SIZE = {
  w: 300,
  h: 200
}

class Cropp extends Component {
  constructor (props) {
    super(props)
    this.initCropper = this.initCropper.bind(this)
  }

  initCropper () {
    let img = new Image()
    img.src = this.props.src
    let cropAreaWidth, cropAreaHeight
    img.onload = () => {
      console.log(img.height)
      if (img.width < img.height) {
        cropAreaHeight = this.props.minCropBoxHeight * (CROP_CONTAINER_SIZE.h / img.height)
      } else {
        cropAreaWidth = this.props.minCropBoxWidth * (CROP_CONTAINER_SIZE.w / img.width)
      }
      console.log(cropAreaHeight)
      console.log(cropAreaWidth)
      CROPPER = new Cropper(this.image, {
        center: true,
        zoomable: true,
        viewMode: 2,
        checkCrossOrigin: false,
        aspectRatio: this.props.ratio ? this.props.ratio.w / this.props.ratio.h : NaN,
        minCropBoxWidth: cropAreaWidth,
        minCropBoxHeight: cropAreaHeight,
        ready: () => {
          let data = CROPPER.getData()
          this.props.setData(data)
          console.log(data)
        },
        cropend: () => {
          let data = CROPPER.getData()
          this.props.setData(data)
          console.log(data)
        },
        preview: document.getElementsByClassName([styles.preview])[0]
      })
    }
  }

  componentDidMount () {
    if (this.props.croppVisiable) {
      this.initCropper()
    }
  }

  render () {
    let { className, src, ratio, ...rest } = this.props
    return <div className={classnames(styles.Cropp, { [className]: !!className })}>
      <div
        style={
          {
            width: '100%',
            height: '300px'
          }
        }
      >
        <img
          id='image_crop'
          src={src}
          style={{ maxWidth: '100%' }}
          ref={child => this.image = child}
        />
      </div>
      <div className={styles.preview} style={ratio ? { width: ratio.w * 0.25, height: ratio.h * 0.25 } : { width: 750 * 0.25, height: 420 * 0.25 }} />
    </div>
  }
}

export default Cropp
