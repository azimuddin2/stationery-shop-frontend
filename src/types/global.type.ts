import { BaseQueryApi } from '@reduxjs/toolkit/query';
import React from 'react';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  totalDoc: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  meta?: TMeta;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
