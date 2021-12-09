import Axios from 'axios';
import FormData from 'form-data';

import SilverboxFile from '../../interfaces/SilverboxFile';

/**
 * Upload new file to CDN
 * @param url - file upload full URL
 * @param files - files to upload
 * @param key - authorization key
 * @returns informations about file
 */
export const uploadFile = async (
  url: string,
  file: Buffer,
  filename: string,
  key: string
): Promise<SilverboxFile> => {
  try {
    const formData = new FormData();
    formData.append('file', file, { filename });

    const response = await Axios(url, {
      method: 'POST',
      data: formData,
      headers: {
        'x-api-key': key,
        ...formData.getHeaders(),
      },
    });

    if (!response.data[0]) throw new Error('File was not uploaded');

    return response.data[0];
  } catch (e) {
    if (e.response?.status === 401)
      throw new Error('Silverbox authorization credentials are invalid');

    if (e.response?.status === 403) throw new Error('Silverbox returned Forbidden response');

    throw e;
  }
};

/**
 * Delete given file from CDN
 * @param fileURL - file full URL
 * @param key - authorization key
 */
export const deleteFile = async (fileURL: string, key: string): Promise<void> => {
  await Axios(fileURL, {
    method: 'DELETE',
    headers: {
      'x-api-key': key,
    },
  });
};

/**
 * @description Returns given file as a Binary stream
 * @param fileURL - file full URL
 * @param key - authorization key
 * @returns stream object with downloaded file
 */
export const getFileStream = async (
  fileURL: string,
  key: string
): Promise<NodeJS.ReadableStream> => {
  const { data } = await Axios(fileURL, {
    method: 'GET',
    responseType: 'stream',
    headers: {
      'x-api-key': key,
    },
  });
  return data;
};

/**
 * Returns information about given file
 * @param fileURL - file full URL
 * @param key - authorization key
 * @returns informations about file
 */
export const getFileInfo = async (fileURL: string, key: string): Promise<SilverboxFile> => {
  const { data } = await Axios(`${fileURL}/info`, {
    method: 'GET',
    headers: {
      'x-api-key': key,
    },
  });
  return data;
};
