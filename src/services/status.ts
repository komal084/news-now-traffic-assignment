import { request } from '@/services/requests';

const VUE_APP_API_DOMAIN = 'http://localhost:8000';

export async function getTrafficLightStatus (code?: string): Promise<void> {
  let url = `${VUE_APP_API_DOMAIN}/status`;

  if (code) {
    url = `${VUE_APP_API_DOMAIN}/status?code=${parseInt(code)}`;
  }

  return await request.get({ url: url });
}
