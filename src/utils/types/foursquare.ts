export interface IFoursquareLocation {
  address: string;
  crossStreet?: string;
  lat: number;
  lng: number;
  distance?: number;
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
}
export interface IFoursquareIcon {
  prefix: string;
  suffix: string;
}
export interface IFoursquareCategory {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: IFoursquareIcon;
  primary: boolean;
  categories?: IFoursquareCategory[];
}

export interface IFoursquareVenue {
  id: string;
  name: string;
  location: IFoursquareLocation;
  categories: IFoursquareCategory[];
  description?: string;
  url?: string;
  contact?: IFoursquareContact;
  canonicalUrl?: string;
  price?: IFoursquarePrice;
  menu?: IFoursquareMenu;
  hours?: IFoursquarHours;
  photos?: IFoursquareDetailsPhotos;
}

export interface IFoursquareVenueResponse {
  meta: {
    code: number;
    requestId: string;
  };
  response: {
    venues: IFoursquareVenue[];
  };
}

export interface IFoursquareContact {
  formattedPhone?: string;
  twitter?: string;
  facebookUsername?: string;
}

export interface IFoursquarePrice {
  tier: number;
}

export interface IFoursquareMenu {
  label: string;
  url: string;
}

export interface IFoursquareOpen {
  renderedTime: string;
}

export interface IFoursquareTimeframe {
  days: string;
  open: IFoursquareOpen[];
}

export interface IFoursquarHours {
  timeframes: IFoursquareTimeframe[];
}

export interface IFoursquareItem {
  id: string;
  createdAt: number;
  source: {
    name: string;
    url: string;
  };
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  visibility: string;
}

export interface IFoursquareGroups {
  type: string;
  name: string;
  count: number;
  items: IFoursquareItem[];
}

export interface IFoursquareDetailsPhotos {
  count: number;
  groups: IFoursquareGroups[];
}

export interface IFoursquarePhotos {
  items: IFoursquareItem[];
}

export interface IFoursquareDetailsResponse {
  meta: {
    code: number;
    requestId: string;
  };
  response: {
    venue: IFoursquareVenue;
  };
}

export interface IFoursquarePhotosResponse {
  meta: {
    code: number;
    requestId: string;
  };
  response: {
    photos: IFoursquarePhotos;
  };
}

export interface IFoursquareVenueCategoriesResponse {
  response: {
    categories: IFoursquareCategory[];
  };
}
