// import React, { useState, useEffect } from 'react';
// import 'antd/dist/antd.less';
// import '../../App.less';
// import {Link} from 'react-router-dom';
// import {Avatar,  Comment, Tooltip} from 'antd';

// function MessageCourt(props){
//     const [color, setColor] = useState('#ffffff')

//     return(

//     <Link to={'/messageRoom'}>
//         <Comment
//             onMouseEnter={()=> setColor("#a5b1c2")}
//             onMouseLeave={()=> setColor("#ffffff")} 
//             style={{border:'1px solid #4b6584', textAlign:'left', backgroundColor:color, borderRadius:10, boxShadow:'5px 5px 5px #4b6584'}}
//             // actions={[<span key="comment-basic-reply-to">Répondre</span>]}
//             author={<a>{props.message.nom}</a>}
//             avatar={
//                 <Avatar
//                 src={props.message.avatar}
//                 alt={props.message.nom}
//                 />
//             }
//             content={
//                 <p>
//                 {props.message.contenu}
//                 </p>
//             }
//             datetime={
//                 <Tooltip title={props.moment().format('YYYY-MM-DD HH:mm:ss')}>
//                 <span>{props.message.date}</span>
//                 {/* <span>{moment().fromNow()}</span> */}
//                 </Tooltip>
//             }
//         />
//         </Link>
//     )}

//     export default connect(
//         null, 
//         mapDispatchToProps
//       )(MessageCourt);