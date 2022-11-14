import { SATOSHI } from "../constants/common";

export const greaterThanSatoshi = (value: Nullable<number>) => value ? value > SATOSHI : false