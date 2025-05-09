
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from './types';

type NavItemProps = {
  item: NavigationItem;
};

export const NavItem = ({ item }: NavItemProps) => {
  return (
    <Link
      to={item.path}
      className="text-sm font-medium font-playfair text-gray-700 hover:text-primary"
    >
      {item.label}
    </Link>
  );
};
