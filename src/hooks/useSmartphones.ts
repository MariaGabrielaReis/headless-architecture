import { useEffect, useState } from 'react';
import { ISmartphone } from '../components/SmartphoneItem';

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
  const [phones, setPhones] = useState<ISmartphone[]>();
  const [storage, setStorage] = useState<string>();
  const [manufacturer, setManufacturer] = useState<string>();

  useEffect(() => {
    const params = new URLSearchParams(getFilters(storage, manufacturer));

    fetch(`http://localhost:3333/smartphones?${params}`).then(async res => {
      const data = await res.json();
      setPhones(data);
    });
  }, [storage, manufacturer]);

  return { phones, setStorage, setManufacturer };
}
