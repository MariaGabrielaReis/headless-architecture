import { useEffect, useState } from 'react';
import { FilterButton } from './components/FilterButton';
import { ISmartphone, SmartphoneItem } from './components/SmartphoneItem';

function App() {
  const [phones, setPhones] = useState<ISmartphone[]>();
  const [storage, setStorage] = useState<string>();
  const [manufacturer, setManufacturer] = useState<string>();

  useEffect(() => {
    fetch(`http://localhost:3333/smartphones`).then(async res => {
      const data = await res.json();
      setPhones(data);
    });
  }, []);

  return (
    <div className="">
      <section className="max-w-5xl m-auto shadow-lg py-24 mt-12">
        <h1 className="text-center text-3xl text-blue-700 font-bold">
          Celulares a Preço de Fábrica
        </h1>

        <pre>{JSON.stringify({ storage, manufacturer }, null, 2)}</pre>

        <div className="flex w-full space-x-6 mt-12">
          <div className="flex flex-col shadow items-center p-6 w-full">
            <label className="text-lg font-bold">Armazenamento</label>
            <div className="flex space-x-2 mt-6">
              <FilterButton onClick={() => setStorage('')}>Todos</FilterButton>
              <FilterButton onClick={() => setStorage('64GB')}>
                64GB
              </FilterButton>
              <FilterButton onClick={() => setStorage('128GB')}>
                128GB
              </FilterButton>
              <FilterButton onClick={() => setStorage('256GB')}>
                256GB
              </FilterButton>
            </div>
          </div>

          <div className="flex flex-col shadow items-center p-6 w-full">
            <label className="text-lg font-bold">Marca</label>
            <div className="flex space-x-2 mt-6">
              <FilterButton onClick={() => setManufacturer('')}>
                Todas
              </FilterButton>
              <FilterButton onClick={() => setManufacturer('Apple')}>
                Apple
              </FilterButton>
              <FilterButton onClick={() => setManufacturer('Samsung')}>
                Samsung
              </FilterButton>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-around space-y-12 mt-12">
          {phones?.map((phone: ISmartphone) => (
            <SmartphoneItem data={phone} key={phone.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
