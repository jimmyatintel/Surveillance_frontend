import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  const [hlsUrl, setHlsUrl] = useState(
    "http://10.227.106.11:8000/video/jimmytesting/all.m3u8"
  );

  return (
    <div className="row justify-content-center">
      
    </div>
  );
}
