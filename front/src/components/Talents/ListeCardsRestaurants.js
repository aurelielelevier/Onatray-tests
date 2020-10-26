import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import {List, Rate} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

const style= {
    textCard:{
        color:"#4B6584",
        margin:'0px 20px'
    },
    textCard2:{
        color:"#4B6584",
        margin:'0px',
        fontSize:'20px',
        margin:'0px 20px'
    }
}

const listData = [];
    for (let i = 0; i < 10; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `Nom du restaurant ${i}`,
       // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            <div >
                <p style={style.textCard}>56 boulevard Péreire 75017 Paris</p>
                <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>0648595747</p>
                <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> adresse@slkfsdkfjhfdsf.fr</p>
                <p style={style.textCard2}><FacebookOutlined /> <InstagramOutlined /></p>
            </div>,
        content:
        <div>
            <p style={style.textCard}>Note moyenne attribuée par nos talents :</p> 
            <p style={style.textCard}><Rate disabled defaultValue={2} />2 (10 votes)</p>
           
        </div>,
    });
    }


function ListeCarsRestaurants(){
   
    useEffect(() => {

    
      }, [])

      
    return(
    
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={listData}
            // footer={
            // <div>
            //     <b>ant design</b> footer part
            // </div>
            // }
            renderItem={item => (
            <List.Item
                key={item.title}
                actions={[
                    <p style={style.textCard}><HeartOutlined style={{color:'red', fontSize:'20px', marginRight:'20px'}}/>J'ajoute ce restaurant en favori !</p>,
                ]}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src="https://cdn.pixabay.com/photo/2016/11/29/12/54/bar-1869656_1280.jpg"
                />
                }
            >
                <List.Item.Meta
                //avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
                />
                {item.content}
                </List.Item>
            )}
        />
                
    )
}




export default ListeCarsRestaurants;