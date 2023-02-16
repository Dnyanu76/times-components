import React from 'react';
import { MenuItem } from 'newskit';
import { MenuDivider, MenuItems, MenuItemsWrapper } from '../styles';
import { SecondaryMenuItem } from '../types';

export const NavItems: React.FC<{
  data: SecondaryMenuItem[];
  handleSelect: (title: string) => void;
}> = ({ data, handleSelect }) => {
  const menuItemsPreset = {
    stylePreset: 'menuItemL1'
  };

  return (
    <MenuItemsWrapper>
      {data.map(item => (
        <MenuItems>
          <MenuItem
            overrides={{ ...menuItemsPreset, typographyPreset: 'newPreset01' }}
            href={item.url}
            id={`vertical-${item.slug}`}
            key={item.slug}
            onClick={() => handleSelect(item.title)}
          >
            {item.title}
          </MenuItem>
          <MenuDivider />
        </MenuItems>
      ))}
    </MenuItemsWrapper>
  );
};