import React, {useState, useEffect} from 'react'

import 'antd/dist/antd.less';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

function Test(){

    return(
        <Map center={[48.8534, 2.3488]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            
            <Marker position={[48.8534, 2.3488]}>           
                <Popup> Mon domicile <br/></Popup>
            </Marker>
        </Map>
    )
}

export default Test