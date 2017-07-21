import axios from 'axios';

export interface IAction {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export interface IAddress {
    id?: string;
    type?: 'listing';
    attributes: {
        title: string;
        url: string;
    };
}

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const EDIT_ADDRESS = 'EDIT_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';

const baseURL = 'https://clientside-api.herokuapp.com/api/v1';
const apiKey = 'a04122d47f53fa28edd441ac101b8c8d';
const timeout = 3000;
const headers = { 'Authorization': apiKey };
const axiosInstance = axios.create({ baseURL, timeout, headers });

export function addAddress(address: IAddress): IAction {
    const requestData = { data: address };
    const request = axiosInstance.post(`/listings`, requestData);

    return {
        type: ADD_ADDRESS,
        payload: request
    };
}

export function editAddress(address: IAddress): IAction {
    const { id } = address;
    const requestData = { data: address };
    const request = axiosInstance.put(`/listings/${id}`, requestData);

    return {
        type: EDIT_ADDRESS,
        payload: request
    };
}

export function deleteAddress(id: number): IAction {
    const request = axiosInstance.delete(`/listings/${id}`);

    return {
        type: DELETE_ADDRESS,
        payload: request
    };
}

export function fetchAddresses(): IAction {
    const request = axiosInstance.get(`/listings`);

    return {
        type: FETCH_ADDRESSES,
        payload: request
    };
}
