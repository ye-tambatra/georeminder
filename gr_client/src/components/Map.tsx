import React from "react";
import { MapContainer, TileLayer, Marker as ReactLeafletMarker, Popup, Circle, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

export interface MarkerProps {
   position: [number, number];
   popupText?: string;
   iconUrl?: string;
}

interface CircleProps {
   center: [number, number];
   radius: number;
   popupText?: string;
}

interface MapProps {
   center?: [number, number];
   zoom?: number;
   markers?: MarkerProps[];
   circles?: CircleProps[];
   className?: string;
   onClick?: (coord: { lat: number; lng: number }) => void;
}

const DEFAULT_CENTER: [number, number] = [-18.8792, 47.5079]; // Antananarivo, Madagascar coordinates
const DEFAULT_ZOOM = 17;
const BOUNDS = L.latLngBounds(
   [-18.975, 47.455], // Southwest corner (bottom-left)
   [-18.795, 47.65] // Northeast corner (top-right)
);
const MIN_ZOOM = 14;

const Map: React.FC<MapProps> = ({
   center = DEFAULT_CENTER,
   zoom = DEFAULT_ZOOM,
   markers = [],
   circles = [],
   className,
   onClick,
}) => {
   return (
      <div className={cn("relative w-full h-full", className)}>
         <MapContainer
            center={center}
            zoom={zoom}
            maxBounds={BOUNDS}
            maxBoundsViscosity={1.0}
            minZoom={MIN_ZOOM}
            className="w-full h-full">
            <TileLayer
               url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
               maxZoom={20}
               subdomains={["mt1", "mt2", "mt3"]}
               attribution="Google"
            />
            <Markers markers={markers} onClick={onClick} />
            {circles.map((circle, index) => (
               <Circle key={index} center={circle.center} radius={circle.radius}>
                  {circle.popupText && <Popup>{circle.popupText}</Popup>}
               </Circle>
            ))}
         </MapContainer>
      </div>
   );
};

const Markers = (props: { markers: MarkerProps[]; onClick?: (coord: { lat: number; lng: number }) => void }) => {
   const map = useMapEvents({
      click: (e) => {
         if (props.onClick) {
            props.onClick({
               lat: e.latlng.lat,
               lng: e.latlng.lng,
            });
         }
      },
   });

   return props.markers.map((marker, index) => (
      <ReactLeafletMarker key={index} position={marker.position}>
         {marker.popupText && <Popup>{marker.popupText}</Popup>}
      </ReactLeafletMarker>
   ));
};

export default Map;
