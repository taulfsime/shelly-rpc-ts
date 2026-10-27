// the camera's live video (WebRTC), answered by its streamer process
export type shelly_streamer_rpc_method_map_t = {
  'Streamer.GetAnswer': {
    params: {
      sdp: string; // the WebRTC offer
      ice_servers: string[];
      stream_id?: number;
      session_id?: string;
    };
    result: {
      session_id: string;
      sdp: string; // the answer
    };
  };
  'Streamer.SetStreamSource': {
    params: {
      session_id: string;
      stream_id: number;
    };
    result: unknown;
  };
  'Streamer.StopStream': {
    params: {
      session_id: string;
      id?: number; // the stream id
    };
    result: unknown;
  };
};
