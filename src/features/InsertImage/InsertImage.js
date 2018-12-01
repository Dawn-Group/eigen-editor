import { Modal, Tabs, Upload, Icon, Spin, Radio, Button,Tooltip } from 'antd'
import React, { Component } from 'react'
import styles from './InsertImage.scss';
import './reset.css';
import { IconCustom } from '@features'
import Masonry from 'react-masonry-component'
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

const masonryOptions = {
  transitionDuration: 0
}

class InsertImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visiable: false,
      imageLinks: [
      ],
      pictureRecommend: [],
      loading: false,
      setLink: ''
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancle = this.handleCancle.bind(this)
    this.handlePostImage = this.handlePostImage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.tabClick = this.tabClick.bind(this)
  }

  handleOk() {
    let param = {
      type: 'image',
      obj: {
        src: this.state.setLink
      }
    }
    this.props.features.insertImage(this.props.editorState, param)
    this.setState({
      visiable: false
    })
  }

  handleCancle() {
    this.setState({
      visiable: false,
      loading: false
    })
  }

  onChange(value) {
    const { insertImageChange } = this.props;
    this.setState({
      setLink: value.target.value
    }, () => {
      insertImageChange && insertImageChange(this.state.imageLinks, this.state.setLink)
    })
  }

  handlePostImage(infor) {
    const { insertImageChange } = this.props;
    if (infor.file.status === 'uploading') {
      this.setState({
        loading: true
      })
    }
    if (infor.file.status == 'done') {
      let images = this.state.imageLinks
      images.push(infor.file.response.url)
      this.setState({
        imageLinks: images
      }, () => {
        if (this.state.setLink == '' && this.state.imageLinks.length) {
          this.setState({
            setLink: this.state.imageLinks[0]
          }, () => {
            insertImageChange && insertImageChange(this.state.imageLinks, this.state.setLink)
          })
        } else {
          this.setState({
            setLink: this.state.imageLinks[this.state.imageLinks.length - 1]
          }, () => {
            insertImageChange && insertImageChange(this.state.imageLinks, this.state.setLink)
          })
        }
      })
      this.setState({
        loading: false
      })
    }
  }

  tabClick(e) {
    if (e == 1) {
      const self = this
      const { pictureRecommend } = this.props
      pictureRecommend && pictureRecommend(function (recommend) {
        let picture = recommend && recommend[0].picture
        self.setState({
          // imageLinks: picture,
          pictureRecommend: picture,
        },()=> {
         // console.log(self, 222)
        })
      }, self)
      // let dispatch = features.dispatchFunc()
      // dispatch({
      //   type: 'writingpage/switchRightTab',
      //   payload: '2'
      // })
      // dispatch({
      //   type: 'writingpage/getAdvise',
      //   payload: {
      //     intent: features.model().currentIntent
      //   }
      // })
    }
  }

  render() {
    let { features, plateform } = this.props
    return <Tooltip placement="top" title="图片">
    <div>
      <Modal
        visible={this.state.visiable}
        onCancel={this.handleCancle}
        footer={null}
        width={700}
      >
        <Tabs defaultActiveKey='2'
          style={{marginBottom: 0}}
          onTabClick={ this.tabClick }
        >
          <TabPane tab='推荐图片' key='1' >
            <div className={styles.imagebox}>
              <RadioGroup
                style={{
                  width: "100%",
                  marginTop: 8,
                  display: 'flex',
                  flexFlow: 'wrap',
                  justifyContent: 'flex-start'
         }}
                className={styles.SwitchPanel}
                onChange={this.onChange}
                value={this.state.setLink}
              >
                <Masonry
                  className={styles.test} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad // default false and works only if disableImagesLoaded is false
                >
                  {
                    this.state.pictureRecommend.length ? this.state.pictureRecommend.map((item, index) => {
                      return <div
                        key={index}
                        className={styles.switchSku}
                        style={{ width: '30%' }}
                      >
                        <Radio
                          className={styles.radioSet}
                          checked={this.state.setLink === item.url}
                          value={item.url}
                        />
                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={item.url}
                        />
                      </div>
                    }) : ''
                  }
                </Masonry>
              </RadioGroup>
              </div>
          </TabPane>
          <TabPane tab='上传图片' key='2'>
            <RadioGroup
              className={styles.SwitchPanel}
              style={{
                width: "100%",
                marginTop: 8,
                marginLeft: 16,
                display: 'flex',
                flexFlow: 'wrap',
                justifyContent: 'flex-start'
              }}
              onChange={this.onChange}
              value={this.state.setLink}>
              {
                this.state.imageLinks.map((item, index) => {
                  return <div
                    key={index}
                    className={styles.switchSku}
                    style={{ width: "calc(30% - 4px)", position: "relative" }}
                  >
                    <Radio
                      className={styles.radioSet}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8
                      }}
                      checked={this.state.setLink === item}
                      value={item}
                    />
                    <img
                      style={{ width: '100%', height: '100%'}}
                      src={item}
                    />
                  </div>
                })
              }
            </RadioGroup>
            <div style={{ marginTop: 8 }}>
              {
                <Spin spinning={this.state.loading}>
                  <Upload
                    multiple
                    accept={this.props.accept || "image/*"}
                    showUploadList={false}
                    action={features.uploadImageLink()}
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
          </TabPane>
          {/* <TabPane tab='正文图片' key='3' >
          </TabPane> */}
        </Tabs>
        <div className={styles.footer}>
          <p>建议尺寸：900像素 * 500像素，请添加1张以内图片 （已选<span>{this.state.setLink ? 1 : 0}/1）</span></p>
          <Button type={'primary'} onClick={() => {
            this.handleOk()
          }}>下一步</Button>
        </div>
      </Modal>

      {
        plateform.indexOf('ADDIMG') != -1
          ? <IconCustom content='&#xe60c;'
            style={{ marginRight: '16px', cursor: 'pointer' }}
            onClick={(e) => {
              this.setState({
                visiable: true
              })
            }}
          />
          : ''
        }
    </div></Tooltip>
    }
  }
  
  export default InsertImage
