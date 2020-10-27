import React, {useState, useEffect} from 'react'
import '../../App.less';
import 'antd/dist/antd.less';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';


function MapRestaurants(props){
    
    // il faudra faire une requette en BDD au chargement pour savoir si déjà défini par le Talent et que le 
    // périmètre soir dessiné au chargement et puisse être modifié
    const [polygoneinverse, setPolygoneinverse] = useState([])
    const[markers, setMarkers] = useState([])
    const[adresse, setAdresse] = useState('')
    const[adressesProposees, setAdressesProposees] = useState('')
    const [latlngDomicile, setLatlngDomicile] = useState([48.8534, 2.3488])
    
    
    useEffect(() => {
       // fecth get pour obtenir le latlng de l'adresse et le polygone défini par l'utilisateur
       // gérer l'absence de périmètre défini
        

      }, [])

      async function envoiPolygone(){
        var listePoints = await JSON.stringify(polygoneinverse)
        var rawResponse = await fetch('/envoi-secteur', {
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`id=1&liste=${listePoints}`
          // Ajouter id du talent à la requête POST
        })
        var response = await rawResponse.json();
        var responsecorrigee = response.map(point => [point.adresseLatLng[1], point.adresseLatLng[0]])
        setMarkers(responsecorrigee)
      }

    return(
   
        <Map center={latlngDomicile} zoom={12} onClick={(e) => { console.log(e)}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* {markers.map((user,i)=>{ 
                return (<Marker position={user}></Marker>)
                })} */}

            <Marker position={latlngDomicile}>
                <Popup> Mon domicile <br/></Popup>
            </Marker>
        </Map>
    )
}


export default MapRestaurants;