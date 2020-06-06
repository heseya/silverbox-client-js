import queryString from 'query-string';
import { getBinaryFile, getFileInfo, uploadFile, deleteFile } from './services/cdn';

import SilverboxConfig from '../interfaces/SilverboxConfig';
import SilverboxResponseFile from '../interfaces/SilverboxResponseFile';
import SilverboxParams from '../interfaces/SilverboxParams';

export default class Silverbox {
  /**
   * CDN Server URL
   */
  private host: string;

  /**
   * CDN client name
   */
  private client: string;

  /**
   * Client acces key
   */
  private key: string;

  private getFullPath(file?: string, params?: SilverboxParams) {
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

  /**
   * Set new host to the instance
   * @param host - new host
   */
  setHost(host: string): void {
    // TODO: host validation
    this.host = host;
  }

  /**
   * @returns Current host name
   */
  getHost() {
    return this.host;
  }

  /**
   * Set new client to the instance
   * @param client - new client
   */
  setClient(client: string): void {
    // TODO: client validation
    this.client = client;
  }

  /**
   * @returns Current client name
   */
  getClient() {
    return this.client;
  }

  /**
   * Set new key to the instance
   * @param key - new key
   */
  setKey(key: string): void {
    this.key = key;
  }

  /**
   * Clones Silverbox instance
   * @returns cloned instance
   */
  clone(): Silverbox {
    return new Silverbox({
      host: this.host,
      client: this.client,
      key: this.key
    });
  }

  /**
   * Sets client and key to cloned instance and returns it
   * @param client
   * @param key
   * @returns modified instance
   */
  as(client: string, key: string = null): Silverbox {
    const clone = this.clone();
    clone.setClient(client);
    clone.setKey(key);
    return clone;
  }

  /**
   * Returns full URL for given fileName
   * @param fileName
   * @param params - query string params
   */
  get(fileName: string, params?: SilverboxParams): string {
    return this.getFullPath(fileName, params);
  }

  /**
   * Returns binary object of given fileName
   * @param fileName
   * @param params - query string params
   */
  async getBinary(fileName: string, params?: SilverboxParams): Promise<NodeJS.ReadableStream> {
    const url = this.getFullPath(fileName, params);
    return getBinaryFile(url);
  }

  /**
   * Returns details about given fileName
   * @param fileName
   */
  async getInfo(fileName: string): Promise<SilverboxResponseFile> {
    const url = this.getFullPath(fileName);
    return getFileInfo(url);
  }

  /**
   * Uploads new file to CDN, and returns details about him
   * @param fileName
   */
  async upload(file: any): Promise<SilverboxResponseFile> {
    const url = this.getFullPath();
    return uploadFile(url, file);
  }

  /**
   * Deletes given fileName from CDN
   * @param fileName
   */
  async delete(fileName: string): Promise<void> {
    const url = this.getFullPath(fileName);
    await deleteFile(url);
  }
}
