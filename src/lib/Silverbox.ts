import queryString from 'query-string';
import { Method, AxiosResponse } from 'axios';
import SilverboxConfig from '../interfaces/SilverboxConfig';
import SilverboxResponseFile from '../interfaces/SilverboxResponseFile';
import { makeRequest } from './methods/request';
import SilverboxParams from '../interfaces/SilverboxParams';

export default class Silverbox {
  private host: string;
  private client: string;
  private key: string;

  private getFullPath(file: string, params?: SilverboxParams) {
    const query = params ? `?${queryString.stringify(params)}` : '';
    return `${this.host}/${this.client}/${file}${query}`;
  }

  constructor({ host, client, key }: SilverboxConfig) {
    if (!host) {
      throw new Error('[Silverbox] Host cannot be null');
    }

    this.setHost(host);
    if (client) this.setClient(client);
    if (key) this.setKey(key);
  }

  setHost(host: string): void {
    this.host = host;
  }

  setClient(client: string): void {
    this.client = client;
  }

  setKey(key: string): void {
    this.key = key;
  }

  clone(): Silverbox {
    return new Silverbox({
      host: this.host,
      client: this.client,
      key: this.key
    });
  }

  as(client: string, key: string = null): Silverbox {
    const clone = this.clone();
    clone.setClient(client);
    clone.setKey(key);
    return clone;
  }

  get(fileName: string, params?: SilverboxParams): string {
    return this.getFullPath(fileName, params);
  }

  getBinary(fileName: string, params?: SilverboxParams): Promise<AxiosResponse> {
    const path = this.getFullPath(fileName, params);
    return makeRequest(path);
  }

  async info(fileName: string): Promise<SilverboxResponseFile> {
    const { data } = await this.request(`${fileName}/info`);
    return data;
  }

  async upload(file: any): Promise<SilverboxResponseFile> {
    const { data } = await this.request('', 'POST', file);
    return data;
  }

  async delete(fileName: string): Promise<void> {
    await this.request(fileName, 'DELETE');
  }

  request(url: string, method?: Method, payload?: Object): Promise<AxiosResponse> {
    const requestUrl = this.getFullPath(url);
    return makeRequest(requestUrl, method, payload);
  }
}
