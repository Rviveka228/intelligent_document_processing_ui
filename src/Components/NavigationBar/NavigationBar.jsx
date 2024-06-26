/* eslint-disable react/jsx-key */
import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import {navMenuItems} from '../../Utils/navMenu';
import cn from './NavigationBar.module.scss';
import {useSession} from '../SecuredLayout';
export function NavigationBar() {
  const session = useSession();

  const allowedNavList = useMemo(() => {
    if (!session.isAdmin) {
      return navMenuItems.filter((item) => !item.adminOnly);
    }
    return navMenuItems;
  }, [session.isAdmin]);

  return (
    <nav className={cn.mainNavigation}>
      <ul className={cn.navigationList}>
        {allowedNavList.map((item) => {
          return (
            <li key={item.key}>
              <NavLink to={item.path} key={item.key}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
