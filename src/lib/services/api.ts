import Axios from 'axios'
import FormData from 'form-data'

import SilverboxResponseFile from '../../interfaces/SilverboxFile'

/**
 * Upload new file to CDN
 * @param url - file upload full URL
 * @param file - file to upload
 * @param key - authorization key
 */
export const uploadFile = async (
  url: string,
  file: NodeJS.ReadableStream,
  key: string
): Promise<SilverboxResponseFile> => {
  const formData = new FormData()
  formData.append('file', file) // TODO: Check if key should be 'file'

  const { data } = await Axios(url, {
    method: 'POST',
    data: formData,
    headers: {
      Authorization: key,
    },
  })
  return data
}

/**
 * Delete given file from CDN
 * @param fileURL - file full URL
 * @param key - authorization key
 */
export const deleteFile = async (fileURL: string, key: string): Promise<void> => {
  await Axios(fileURL, {
    method: 'DELETE',
    headers: {
      Authorization: key,
    },
  })
}

/**
 * Returns given file as a Binary stream
 * @param fileURL - file full URL
 * @param key - authorization key
 */
export const getBinaryFile = async (
  fileURL: string,
  key: string
): Promise<NodeJS.ReadableStream> => {
  const { data } = await Axios(fileURL, {
    method: 'GET',
    responseType: 'stream',
    headers: {
      Authorization: key,
    },
  })
  return data
}

/**
 * Returns information about given file
 * @param fileURL - file full URL
 * @param key - authorization key
 */
export const getFileInfo = async (fileURL: string, key: string): Promise<SilverboxResponseFile> => {
  const { data } = await Axios(`${fileURL}/info`, {
    method: 'GET',
    headers: {
      Authorization: key,
    },
  })
  return data
}
