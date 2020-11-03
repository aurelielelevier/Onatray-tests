import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import {List, Rate, Tooltip} from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import {connect} from 'react-redux';

// ajouter image resto, note

const style= {
    textCard:{
        color:"#4B6584",
        margin:'0px'
    },
    textCard2:{
        color:"#4B6584",
        margin:'0px',
        fontSize:'20px',
        margin:'0px'
    }
}


function ListeCardsRestaurants(props){

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
                
                key={item.name}
                actions={[
                   // <p style={style.textCard}><HeartOutlined style={{color:'red', fontSize:'20px', marginRight:'20px'}}/>J'ajoute ce restaurant en favori !</p>,
                ]}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src={item.photo}
                />
                }
            >
                <List.Item.Meta
                title={<div>
                    <Tooltip title="Afficher les détails" color='#4B6584' key="J'aime">
                    <div style={{ fontWeight:'bold', fontSize:'20px', color:'#4B6584'}}>{item.name}</div>
                    </Tooltip>
                    <div><p style={{color:'#a5b1c2'}}><HeartFilled onClick={()=>{props.whishlist(item._id)}} style={{marginRight:'5px', color:item.coeur}}/>J'aime</p></div>
                    
                    </div>
                    }
                description={<div onClick={()=>{props.onclick(item)}}>
                                <p style={style.textCard}>{item.adress}</p>
                                <p style={style.textCard}><PhoneOutlined style={{marginRight:'10px'}}/>{item.phone}</p>
                                <p style={style.textCard}><MailOutlined style={{marginRight:'10px'}}/> {item.email}</p>
                                <p style={style.textCard2}><FacebookOutlined /> <InstagramOutlined /></p>
                                <p style={style.textCard}>Note moyenne attribuée par nos talents :</p> 
                                <p style={style.textCard}><Rate disabled defaultValue={2} /></p>
                                <p style={style.textCard}>2 (10 votes)</p>
                            </div>
                            }
                />
                </List.Item>
            )
        }
        />
                
    )
}

function mapDispatchToProps(dispatch) {
    return {
      onClickResto: function(id) { 
          dispatch( {type: 'restoaafficher', id} ) 
      }
    }
  }

  function mapStateToProps(state) {
    return { listeToDisplay : state.listerestoaafficher}
  }
    
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(ListeCardsRestaurants);
