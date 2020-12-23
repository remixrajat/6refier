import React, { Component } from 'react';
import Cropper from 'react-cropper';
import CommonModal from '../../shared/CommonModal';
import { FieldGroup, Col, Row, Button, Image } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
import Preloader from "../../shared/Preloader/PreLoader"

class ProfileImageUpload extends Component {
    constructor() {
        super();
        this.state = { imageurl: "", cropResult: null };
    }
    _crop() {
        // image in dataUrl
        //console.log("_crop()::");
        //console.log(this.cropper.getCroppedCanvas().toDataURL());
    }

    inputChangeHandler(e) {
        let uri = URL.createObjectURL(e.target.files[0])
        //console.log(uri, e.target.files[0]);
        this.initialImage = e.target.files[0];
        this.setState({ imageurl: uri });
    }

    componentWillMount() {
        //console.log("ProfileImageUpload::componentWillMount::");
    }

    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });
    }

    base64ToBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    submitPhoto(e) {
        let formData = new FormData();
        if (this.state.cropResult !== null || typeof this.state.cropResult !== undefined) {
            let base64ImageContent = this.state.cropResult.replace(/^data:image\/(png|jpg);base64,/, "");
            let blob = this.base64ToBlob(base64ImageContent, 'image/png');
            //console.log(blob);
            formData.append('picture', blob);
        } else {
            formData.append('picture', this.initialImage);
        }
        this.props.submitProfilePicture(formData);
    }


    render() {
        this.isImageInput = (
            <div style={{ "margin": "10px 20px" }}>
                <Row style={{ "marginBottom": "10px", "textAlign": "center" }}>
                    <form>
                        <input type="file"
                            accept=".png, .jpg"
                            className="refier_text_on_light__3"
                            name="imageuploadinput"
                            onChange={this.inputChangeHandler.bind(this)}
                            style={{ 'fontWeight': '700', "fontSize": "14px", "margin": "5px 0" }} />

                    </form>
                </Row>
                {this.state.imageurl.length > 0 ?
                    <div>
                        <Row>
                            <Col xs={5}>

                                {this.state.imageurl.length > 0 ?
                                    <div>
                                        <Cropper
                                            ref={(cropper) => { this.cropper = cropper; }}
                                            src={this.state.imageurl}
                                            style={{ height: 300, width: '40%' }}
                                            // Cropper.js options
                                            // preview=".img-preview"  
                                            aspectRatio={12 / 12}
                                            guides={false}
                                            crop={this._crop.bind(this)} />

                                        <Button bsStyle="default" style={{
                                            marginTop: "20px"
                                            }}
                                            block
                                            className="refier_custom_button_new"
                                            onClick={this.cropImage.bind(this)}>
                                            Crop Image</Button>
                                    </div>
                                    :
                                    null
                                }
                            </Col>
                            <Col xs={2} style={{"textAlign":"center"}}>
                                {
                                    this.state.cropResult?
                                    <FontAwesome
                                        name="long-arrow-right"
                                        
                                        style={{ "color": "#999999", "fontSize": "22px",
                                                "marginTop":"140px" }}
                                    />
                                    :
                                    null
                                }
                            </Col>
                            <Col xs={5} style={{ "textAlign": "center" }}>
                                {this.state.cropResult ?
                                    <div className="box" style={{ width: '100%',height:"300px",
                                             float: 'left' }}>
                                        <Image style={{ width: '100%'}}
                                            src={this.state.cropResult} alt="cropped image" />
                                    <Button bsStyle="primary"
                                        style={{ "marginTop":"20px",
                                        "backgroundColor": "rgba(72, 82, 140, 1)" }} block
                                            onClick={this.submitPhoto.bind(this)}>Submit</Button>
                                        <div style={{paddingTop:"20px"}}>
                                    {
                                    this.props.imageUploadProgress == 2 ?
                                        <Preloader loaderMessage="Uploading Image..." /> :
                                        this.props.imageUploadProgress == -1?
                                            <div className="form-status-fail">
                                            Image Upload Failed. Please try again later.
                                            </div>
                                            :
                                            this.props.imageUploadProgress == 1?
                                                <div className="form-status-success">
                                                Image Upload Successful
                                            </div>
                                                :
                                                null
                                    }
                                    </div>
                                    </div>
                                    :
                                    <div className="refier_custom_light_panel_title" style={{ "fontSize": "18px", "fontWeight": "700px", "marginTop": "140px" }}>
                                        Image Not Cropped
                                    </div>
                                }
                                
                            </Col>
                        </Row>
                    </div>
                    :
                    <div className="refier_custom_light_panel_title" style={{ "fontSize": "18px", "fontWeight": "700px" }}>
                        No Image Selected
                </div>
                }
                
            </div>
        );

        return (
            <div>
                <CommonModal close={this.props.onClose}
                    showModal={this.props.showModal}
                    modalHeading="Update Profile Picture"
                    modalBody={this.isImageInput} modalSize={"large"} />


            </div>
        );
    }
}

export default ProfileImageUpload;