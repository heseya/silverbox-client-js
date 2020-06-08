import Axios from 'axios'
import FormData from 'form-data'

import SilverboxFile from '../../interfaces/SilverboxFile'

/**
 * Upload new file to CDN
 * @param url - file upload full URL
 * @param file - file to upload
 * @param key - authorization key
 */
export const uploadFile = async (
  url: string,
  files: NodeJS.ReadableStream[],
  key: string
): Promise<SilverboxFile[]> => {
  const formData = new FormData()
  files.forEach((file, i) => {
    formData.append(`files[${i}]`, file)
  })

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
export const getFileStream = async (
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
export const getFileInfo = async (fileURL: string, key: string): Promise<SilverboxFile> => {
  const { data } = await Axios(`${fileURL}/info`, {
    method: 'GET',
    headers: {
      Authorization: key,
    },
  })
  return data
}
