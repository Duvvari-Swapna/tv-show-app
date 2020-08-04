export interface IShow {
    id: number;
    url?: string;
    name: string;
    type?: string;
    language?: string;
    genres?: string[];
    status?: string;
    runtime?: number;
    premiered?: string;
    officialSite?: string;
    schedule?: {
      time: string;
      days: string[];
    };
    rating: {
      average: number;
    };
    weight?: number;
    webChannel?: string;
    image: {
      medium: string;
      original: string;
    };
    summary?: string;
    updated?: number;
    _links?: {
      nextepisode: {
        href: string;
      }
      previousepisode: {
        href: string;
      };
    };
  }
