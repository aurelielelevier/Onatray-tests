import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import {List, Rate} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
// ajouter image resto, note, ajout whislist...

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

const token = 'Gi2AoHScmfEI2wIiAnDdsCK6plqfww1c'

function ListeCarsRestaurants(props){

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
            dataSource={props.liste}
            renderItem={item => (
            <List.Item
                onClick={()=>props.handleClickParent(item._id)}
                key={item.name}
                actions={[
                   // <p style={style.textCard}><HeartOutlined style={{color:'red', fontSize:'20px', marginRight:'20px'}}/>J'ajoute ce restaurant en favori !</p>,
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
                title={item.name}
                description={<div >
                                <p style={style.textCard}>{item.adress}</p>
                                <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{item.phone}</p>
                                <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {item.email}</p>
                                <p style={style.textCard2}><FacebookOutlined /> <InstagramOutlined /></p>
                                <p style={style.textCard}>Note moyenne attribuée par nos talents :</p> 
                                <p style={style.textCard}><Rate disabled defaultValue={2} /></p>
                                <p style={style.textCard}>2 (10 votes)</p>
                            </div>}
                />
                </List.Item>
            )}
        />
                
    )
}

export default ListeCarsRestaurants;