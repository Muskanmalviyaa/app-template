import { API_BASE_URL, BASE_URLENV } from '@env';

export const BASE_URL = (API_BASE_URL || BASE_URLENV || '').replace(/\/+$/, '');
export const GOOGLE_MAP_API_KEY = '';
export const RZP_KEY_ID = '';
export const CDN_BASE_URL = '';
