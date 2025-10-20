export type shelly_media_type_t = 'media';

export type shelly_media_key_t = shelly_media_type_t;

export type shelly_media_media_type_t = 'RADIO' | 'AUDIO' | 'RINGTONE';

type shelly_media_base_file_type_t = {
  id: number;
  filename: string;
  preview: string;
  title: string;
  size: number;
  index: number;
  valid: boolean;
};

export type shelly_media_audio_type_t = shelly_media_base_file_type_t & {
  track: number;
  artist: string;
  album: string;
  year: number;
  duration: number;
  type: 'AUDIO';
};

export type shelly_media_photo_type_t = shelly_media_base_file_type_t & {
  width: number;
  height: number;
  type: 'PHOTO';
};

export type shelly_media_ringtone_type_t = shelly_media_base_file_type_t & {
  type: 'RINGTONE';
};

export type shelly_media_media_list_item_t =
  | shelly_media_audio_type_t
  | shelly_media_photo_type_t
  | shelly_media_ringtone_type_t;

export type shelly_media_favourite_radio_item_t = {
  id: number;
  name: string;
  country_code: string;
  icon: string;
};

export type shelly_media_buffering_type_t = {
  buffering: boolean;
  enable: boolean;
  media_meta: {
    album?: string;
    artist?: string;
    duration?: number;
    position?: number;
    thumb: string;
    title: string;
  };
  media_type: shelly_media_media_type_t;
  volume: number;
};

export type shelly_media_status_t = {
  playback: {
    enable: boolean;
    buffering: boolean;
    volume: number;
    media_type: shelly_media_media_type_t;
    media_meta: {
      title: string;
      artist: string;
      album: string;
      thumb: string;
    };
    total_size: number;
    total_size_h: string;
    item_counts: {
      audio: number;
      photo: number;
      video: number;
    };
  };
};

export type shelly_media_config_t = {
  rev: number;
};

export type shelly_media_rpc_method_map_t = {
  'Media.GetStatus': {
    params: {};
    result: shelly_media_status_t;
  };
  'Media.List': {
    params: {};
    retult: shelly_media_media_list_item_t[];
  };
  'Media.Radio.ListFavourites': {
    params: {};
    result: shelly_media_favourite_radio_item_t[];
  };
  'Media.PutMedia': {
    params: {
      filename: string;
      append: boolean;
      last: boolean;
      type: shelly_media_media_type_t;
      data: string;
    };
    result: {
      restart_required: boolean;
      offset: number;
    };
  };
  'Media.Reload': {
    params: {};
    result: {
      restart_required: boolean;
    };
  };
  'Media.Delete': {
    params: {
      id?: number;
      ids?: number[];
    };
    result: {
      restart_required: boolean;
      deleted: number;
    };
  };
  'Media.MediaPlayer.Play': {
    params: {
      id?: number;
    };
    result: shelly_media_buffering_type_t;
  };
  'Media.MediaPlayer.Pause': {
    params: {
      id?: number;
    };
    result: shelly_media_buffering_type_t;
  };
  'Media.MediaPlayer.Next': {
    params: {};
    result: shelly_media_buffering_type_t;
  };
  'Media.MediaPlayer.Previous': {
    params: {};
    result: shelly_media_buffering_type_t;
  };
  'Media.Radio.PlayFavourite': {
    params: {
      id: number;
    };
    result: shelly_media_buffering_type_t;
  };
  'Media.Radio.Stop': {
    params: {
      id: number;
    };
    result: shelly_media_buffering_type_t;
  };
  'Media.Radio.PlayNextFavourite': {
    params: {};
    result: shelly_media_buffering_type_t;
  };
  'Media.Radio.PlayPreviousFavourite': {
    params: {};
    result: shelly_media_buffering_type_t;
  };
  'Media.SetVolume': {
    params: {
      volume: number;
    };
    result: shelly_media_buffering_type_t;
  };
  'Media.MediaPlayer.PlayRingtone': {
    params: {
      id: number;
    };
    result: {
      audio_clip: shelly_media_buffering_type_t;
      resume: {
        enable: boolean;
        media_meta: {
          title: string;
        };
        media_type: Extract<shelly_media_media_type_t, 'RINGTONE'>;
        volume: number;
      };
    };
  };
};
