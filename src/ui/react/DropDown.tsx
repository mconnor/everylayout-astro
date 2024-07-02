import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './DropDown.module.css';

export function DropDown() {
  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom" className={styles.container}>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
