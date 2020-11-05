import React, {useState, useEffect} from 'react'

import 'antd/dist/antd.less';
import { Row, Col, Steps, Form, Input, Button, Space, Checkbox, Select, Upload} from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
function Test(){
    const [fileList, setFileList] = useState([]);
    
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      }

    return(
       <div>HzBuqpnY6Qf3JCLQUtCvFu9j3B1Zt8tV
           <ImgCrop rotate>
                            <Upload
                                action={"/upload/"+'HzBuqpnY6Qf3JCLQUtCvFu9j3B1Zt8tV'}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && 'Cliquez ou faites glisser une photo'}
                            </Upload>
                            </ImgCrop>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <Button>TEST</Button> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
       </div>
    )
}

export default Test