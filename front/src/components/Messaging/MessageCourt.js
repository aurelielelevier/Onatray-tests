import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.less';
import '../../App.less';
import {Link} from 'react-router-dom';
import {Avatar,  Comment, Tooltip} from 'antd';
import moment from 'moment';

function MessageCourt(props){

    const [color, setColor] = useState('#ffffff')

   return(

    <Link to={'/messageRoom'}>
    
    <Comment
        onMouseEnter={()=> setColor("#d1d8e0")}
        onMouseLeave={()=> setColor("#ffffff")} 
        style={{border:'1px solid #4b6584', textAlign:'left', backgroundColor:color, borderRadius:10, boxShadow:'5px 5px 5px #4b6584'}}
        // actions={[<span key="comment-basic-reply-to">Répondre</span>]}
        author={<a>{props.nom}</a>}
        avatar={
            <Avatar
            src={props.avatar}
            alt={props.nom}
            />
        }
        content={
            <p>
            {props.contenu}
            </p>
        }
        datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{props.date}</span>
            {/* <span>{moment().fromNow()}</span> */}
            </Tooltip>
        }
    />
    </Link>
)}

export default MessageCourt
