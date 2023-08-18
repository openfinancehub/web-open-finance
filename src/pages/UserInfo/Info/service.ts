import { request } from 'umi';
import type { CurrentUser, ListItemDataType } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/currentUserDetail');
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('http://139.159.205.40:8808/api/fake_list_Detail', {
    params
  });
}
