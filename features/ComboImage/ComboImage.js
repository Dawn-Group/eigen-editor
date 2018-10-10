import { Checkbox } from 'antd'
import React, { Component } from 'react'
import styles from './ComboImage.scss'
import { IconCustom } from '../../features'
import { Modal, Spin, Upload, Icon, message } from 'antd'
import { Cropp } from '../../Dlib'
// import { imageCropBackend, imageMergeBackend } from '../../../../services/server'

class ComboImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisiable: false,
      cimages: [0, 1, 2],
      loading: false,
      data: null,
      src: '',
      croppVisiable: false,
      index: 0,
      mergeVisiable: false,
      cropploading: false,
      mergeloading: false,
      preview: ''
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handlePostImage = this.handlePostImage.bind(this)
    this.removeThisImage = this.removeThisImage.bind(this)
    this.croppThisImage = this.croppThisImage.bind(this)
    this.setData = this.setData.bind(this)
    this.handleCancelCropp = this.handleCancelCropp.bind(this)
    this.handleOkCropp = this.handleOkCropp.bind(this)
  }

  handleCancel () {
    this.setState({
      modalVisiable: false,
      cimages: [0, 1, 2],
      loading: false
    })
  }

  handleOk () {
    var param = []
    for (let i in this.state.cimages) {
      if (this.state.cimages[i] != 0 && this.state.cimages[i] != 1 && this.state.cimages[i] != 2) {
        param.push('https:' + this.state.cimages[i])
      }
    }
    if (param.length) {
      this.setState({
        mergeVisiable: true,
        mergeloading: true
      })
    } else {
      message.warning('请选择图片')
      return
    }
   /*  imageMergeBackend(param).then(res => {
      let param = {
        type: 'image',
        obj: {
          src: res.url
        }
      }
      this.props.features.insertImage(this.props.editorState, param)
      this.setState({
        modalVisiable: false,
        cimages: [0, 1, 2],
        mergeVisiable: false,
        mergeloading: false,
        preview: ''
      })
    }) */
  }

  showModal () {
    this.setState({
      modalVisiable: true
    })
  }

  handlePostImage (infor, index) {
    if (infor.file.status === 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (infor.file.status == 'done') {
      let cimages = this.state.cimages
      cimages[index] = infor.file.response.url
      this.setState({
        cimages: cimages
      }, () => {
        let param = []
        for (let i in this.state.cimages) {
          if (this.state.cimages[i] != 0 && this.state.cimages[i] != 1 && this.state.cimages[i] != 2) {
            param.push('https:' + this.state.cimages[i])
          }
        }
        imageMergeBackend(param).then(res => {
          this.setState({
            preview: res.url
          })
        })
      })
      this.setState({
        loading: false
      })
    }
  }

  setData (data) {
    this.setState({
      data: data
    })
  }

  handleCancelCropp () {
    this.setState({
      croppVisiable: false,
      loading: false
    })
  }

  handleOkCropp () {
    if (this.state.data) {
      this.setState({
        cropploading: true
      })
      var param = {
        url: this.state.src,
        x: this.state.data.x,
        y: this.state.data.y,
        w: this.state.data.width,
        h: this.state.data.height
      }
   /*    imageCropBackend(param).then(res => {
        let cimages = this.state.cimages
        cimages[this.state.index] = res.url
        this.setState({
          cimages: cimages,
          croppVisiable: false,
          loading: false,
          cropploading: false
        }, () => {
          let param = []
          for (let i in this.state.cimages) {
            if (this.state.cimages[i] != 0 && this.state.cimages[i] != 1 && this.state.cimages[i] != 2) {
              param.push('https:' + this.state.cimages[i])
            }
          }
          imageMergeBackend(param).then(res => {
            this.setState({
              preview: res.url
            })
          })
        })
        this.setData(null)
      }) */
    } else {
      this.setState({
        croppVisiable: false,
        loading: false
      })
    }
  }

  removeThisImage (index) {
    let cimages = this.state.cimages
    if (cimages[index]) {
      cimages[index] = index
    }
    this.setState({
      cimages: cimages
    })
  }

  croppThisImage (item, index) {
    this.setState({
      src: item,
      index: index
    }, () => {
      this.setState({
        croppVisiable: true
      })
    })
  }

  render () {
    let { editorState, features, plateform } = this.props
    let width = 100 / this.state.images
    return <div>
      <Modal
        maskClosable={false}
        title={'裁剪图片'}
        visible={this.state.croppVisiable}
        onCancel={this.handleCancelCropp}
        onOk={this.handleOkCropp}
        destroyOnClose
      >
        <Spin spinning={this.state.cropploading}>
          <Cropp src={this.state.src}
            croppVisiable={this.state.croppVisiable}
            setData={this.setData}
          />
        </Spin>
      </Modal>
      <Modal
        maskClosable={false}
        title={'拼接图片'}
        visible={this.state.modalVisiable}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        width={1000}
        destroyOnClose

      >
        <div className={styles.pictures} style={{ width: '100%', overflowX: 'scroll' }}>
          {
            this.state.cimages.map((item, index) => {
              return <Spin spinning={this.state.mergeloading} key={index}>
                <div style={{ marginRight: '5px' }} className={styles.eachImageBox}>
                  {
                    item == 0 || item == 1 || item == 2 ? ''
                      : <div
                        className={styles.cropIcon}
                        onClick={(e) => {
                          this.croppThisImage(item, index)
                        }}
                      >
                        <IconCustom content='&#xe65a;' />
                      </div>
                  }
                  {
                    item == 0 || item == 1 || item == 2 ? ''
                      : <div
                        className={styles.closeIcon}
                        onClick={(e) => {
                          this.removeThisImage(index)
                        }}
                      >
                        <IconCustom content='&#xe693;' />
                      </div>
                  }
                  {
                    item == 0 || item == 1 || item == 2
                      ? <Spin spinning={this.state.loading}>
                        <Upload
                          showUploadList={false}
                          action={'/api/v1/upload/images'}
                          onChange={(e) => {
                            this.handlePostImage(e, index)
                          }}
                        >
                          <div className={styles.uploadButton}>
                            <p>{item + 1}</p>
                          </div>
                        </Upload>
                      </Spin>

                      : <div className={styles.Eachimage} style={{ height: '200px', width: '300px', backgroundImage: `url(${item})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >

                        {/* <img src={item} style={{ maxWidth: "100%", maxHeight: "100%" }} className={styles.croppImage} /> */}

                      </div>

                  }
                </div>
              </Spin>
            })
          }
        </div>
        <div style={{ marginTop: '30px' }}>
          <p>拼接预览:</p>
          {
            this.state.preview != ''
              ? <img src={this.state.preview} style={{ maxWidth: 441, maxHeight: '80%' }} /> : ''
          }
        </div>
      </Modal>

      {
        plateform.indexOf('COMBOIMAGE') != -1
          ? <IconCustom content='&#xe621;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.showModal()
            }}
          /> : ''
      }
    </div>
  }
}

export default ComboImage
