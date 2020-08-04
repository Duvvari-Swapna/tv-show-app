import { IShow } from './show';

export interface IScheduledShow {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  show?: IShow;
  _embedded?: {
    show: IShow;
  };
}
