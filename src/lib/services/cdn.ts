import Axios from 'axios'
import SilverboxResponseFile from '../../interfaces/SilverboxResponseFile'

export const uploadFile = async (url: string, file: any): Promise<SilverboxResponseFile> => {
  const { data } = await Axios(url, {
    method: 'POST',
    data: file,
  })
  return data
}

export const deleteFile = async (fileURL: string): Promise<void> => {
  await Axios(fileURL, {
    method: 'DELETE',
  })
}

export const getBinaryFile = async (fileURL: string): Promise<NodeJS.ReadableStream> => {
  const { data } = await Axios(fileURL, {
    method: 'GET',
    responseType: 'stream',
  })
  return data
}

export const getFileInfo = async (fileURL: string): Promise<SilverboxResponseFile> => {
  const { data } = await Axios(`${fileURL}/info`, {
    method: 'GET',
  })
  return data
}
