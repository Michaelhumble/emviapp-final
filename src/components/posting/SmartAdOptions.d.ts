
export interface NationwideOptionProps {
  isFirstPost?: boolean;
  onChange: (checked: boolean) => void;
  postType?: 'job' | 'salon' | 'booth' | 'supply';
}

export interface FastSalePackageProps {
  onChange: (checked: boolean) => void;
}

export interface ShowAtTopOptionProps {
  onChange: (checked: boolean) => void;
}

export interface BundleWithJobOptionProps {
  onChange: (checked: boolean) => void;
  postType?: 'salon' | 'booth';
}
