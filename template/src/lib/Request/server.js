import { Request } from './index'

export const { GetList, Get, Post, Patch, Delete, Put, reHydrateToken, reHydrateUrl, setHeaders } = new Request(
  process.env.REACT_APP_REST_API_LOCATION
)
