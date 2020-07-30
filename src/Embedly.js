import request from 'axios';
import { embedlyKey } from './config';

export default function getEmbedly(url) {
  return request.get('https://iframe.ly/api/iframely', {
    params: {
      url: url,
      api_key: embedlyKey
    }
  })
}