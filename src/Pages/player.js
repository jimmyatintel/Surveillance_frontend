import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function Player() {
  const [hlsUrl, setHlsUrl] = useState(
    "http://10.227.106.11:8000/video/jimmytesting/all.m3u8"
  );

  return (
    <div className="row justify-content-center">
      <input
        type="text"
        className="form-control w-90 m-2 my-4"
        placeholder="HLS Url..."
        value={hlsUrl}
        aria-label="hls-url"
        aria-describedby="set-hls-url"
        onChange={(e) => setHlsUrl(e.target.value)}
      />
      <ReactHlsPlayer
        src={hlsUrl}
        autoPlay={false}
        controls={true}
        width="60%"
        height="auto"
      />
    </div>
  );
}
