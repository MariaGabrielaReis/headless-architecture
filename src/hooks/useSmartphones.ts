import { useEffect, useState } from 'react';
import { ISmartphone } from '../components/SmartphoneItem';
import { useFetch } from './useFetch';

function getFilters(storage?: string, manufacturer?: string) {
  let filters = {};
  if (storage) {
    filters = { ...filters, storage };
  }
  if (manufacturer) {
    filters = { ...filters, manufacturer };
  }
  return filters;
}

export function useSmartphones() {
  const [storage, setStorage] = useState<string>();
  const [manufacturer, setManufacturer] = useState<string>();

  const params = new URLSearchParams(getFilters(storage, manufacturer));
  const { response } = useFetch<ISmartphone[]>(
    `http://localhost:3333/smartphones?${params}`
  );

  return { phones: response, setStorage, setManufacturer };
}
