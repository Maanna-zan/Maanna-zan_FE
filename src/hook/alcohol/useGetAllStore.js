import React from 'react';
import { apis } from '@shared/axios';
import { cookies } from '@shared/cookie';
import { keys } from '@utils/createQueryKey';
import { useQuery } from '@tanstack/react-query';
const PAGE_SIZE = 16;
export const getAllStore = async (pageNum) => {
  const response = await apis.get(
    `/alkol/all?page=${pageNum}&size=${PAGE_SIZE}`,
  );
  return response.data;
};

export const getBest = async (pageNum) => {
  const response = await apis.get(
    `/alkol/best?page=${pageNum}&size=${PAGE_SIZE}`,
  );
  return response.data;
};

export const getView = async (pageNum) => {
  const response = await apis.get(
    `/alkol/view?page=${pageNum}&size=${PAGE_SIZE}`,
  );
  return response.data;
};

export const getLike = async (pageNum) => {
  const response = await apis.get(
    `/alkol/like?page=${pageNum}&size=${PAGE_SIZE}`,
  );
  return response.data;
};
