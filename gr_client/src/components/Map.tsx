import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

interface MarkerProps {
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
   center?: [number, number]; // Made center optional
   zoom?: number;
   markers?: MarkerProps[];
   circles?: CircleProps[];
   className?: string;
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
}) => {
   return (
      <div className={cn("relative", className)}>
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
            {markers.map((marker, index) => (
               <Marker
                  key={index}
                  position={marker.position}
                  icon={marker.iconUrl ? new L.Icon({ iconUrl: marker.iconUrl }) : undefined}>
                  {marker.popupText && <Popup>{marker.popupText}</Popup>}
               </Marker>
            ))}
            {circles.map((circle, index) => (
               <Circle key={index} center={circle.center} radius={circle.radius}>
                  {circle.popupText && <Popup>{circle.popupText}</Popup>}
               </Circle>
            ))}
         </MapContainer>
      </div>
   );
};

export default Map;
