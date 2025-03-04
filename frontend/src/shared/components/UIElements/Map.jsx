import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current, 
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null); 
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
