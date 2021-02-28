import { ChangePriceDirectionEnum } from '../../../constants/enums';
import { cutEpsilon } from '../../utils';
import { splitByVolume } from './splitByVolume';

describe('Test splitByVolume', () => {
  it('Test 1.1: Both direction. One order', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.01,
      changePriceDirection: ChangePriceDirectionEnum.both,
      volumeLimit: 0.1,
      orderSize: 0.1,
    };

    const result = [{ price: 0.1, volume: 0.1 }];

    const calculatedResult = splitByVolume(data);
    const totalVolume = cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0));

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(data.volumeLimit);
  });

  it('Test 1.2: Both direction. A lot of orders', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.01,
      changePriceDirection: ChangePriceDirectionEnum.both,
      volumeLimit: 0.55,
      orderSize: 0.1,
    };

    const result = [
      { price: 0.12, volume: 0.05 },
      { price: 0.11, volume: 0.1 },
      { price: 0.1, volume: 0.1 },
      { price: 0.09, volume: 0.1 },
      { price: 0.08, volume: 0.1 },
      { price: 0.07, volume: 0.1 },
    ];

    const calculatedResult = splitByVolume(data);
    const totalVolume = cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0));

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(data.volumeLimit);
  });

  it('Test 1.3: Both direction. Out of volume limit', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.05,
      changePriceDirection: ChangePriceDirectionEnum.both,
      volumeLimit: 0.7,
      orderSize: 0.1,
    };

    const result = [
      { price: 0.25, volume: 0.1 },
      { price: 0.2, volume: 0.1 },
      { price: 0.15, volume: 0.1 },
      { price: 0.1, volume: 0.1 },
      { price: 0.05, volume: 0.1 },
    ];

    const calculatedResult = splitByVolume(data);
    const totalVolume = calculatedResult
      ? cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0))
      : undefined;

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(0.5);
  });

  it('Test 2.1: Up direction. A lot of orders', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.01,
      changePriceDirection: ChangePriceDirectionEnum.up,
      volumeLimit: 0.55,
      orderSize: 0.1,
    };

    const result = [
      { price: 0.15, volume: 0.05 },
      { price: 0.14, volume: 0.1 },
      { price: 0.13, volume: 0.1 },
      { price: 0.12, volume: 0.1 },
      { price: 0.11, volume: 0.1 },
      { price: 0.1, volume: 0.1 },
    ];

    const calculatedResult = splitByVolume(data);
    const totalVolume = cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0));

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(data.volumeLimit);
  });

  it('Test 3.1: Down direction. A lot of orders', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.01,
      changePriceDirection: ChangePriceDirectionEnum.down,
      volumeLimit: 0.7,
      orderSize: 0.1,
    };

    const result = [
      { price: 0.1, volume: 0.1 },
      { price: 0.09, volume: 0.1 },
      { price: 0.08, volume: 0.1 },
      { price: 0.07, volume: 0.1 },
      { price: 0.06, volume: 0.1 },
      { price: 0.05, volume: 0.1 },
      { price: 0.04, volume: 0.1 },
    ];

    const calculatedResult = splitByVolume(data);
    const totalVolume = calculatedResult
      ? cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0))
      : undefined;

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(data.volumeLimit);
  });

  it('Test 3.2: Down direction. Out of volume limit', () => {
    const data = {
      initialPrice: 0.1,
      changePriceStep: 0.03,
      changePriceDirection: ChangePriceDirectionEnum.down,
      volumeLimit: 0.7,
      orderSize: 0.1,
    };

    const result = [
      { price: 0.1, volume: 0.1 },
      { price: 0.07, volume: 0.1 },
      { price: 0.04, volume: 0.1 },
      { price: 0.01, volume: 0.1 },
    ];

    const calculatedResult = splitByVolume(data);
    const totalVolume = calculatedResult
      ? cutEpsilon(calculatedResult.reduce((acc, item) => acc + item.volume, 0))
      : undefined;

    expect(calculatedResult).toEqual(expect.arrayContaining(result));
    expect(calculatedResult?.length).toEqual(result.length);
    expect(totalVolume).toEqual(0.4);
  });
});
