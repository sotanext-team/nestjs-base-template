import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

export const postRequest = (
  url: string,
  body: any,
  config: any,
): Observable<any> => {
  const httpService = new HttpService();
  return httpService.post(url, body, config);
};
