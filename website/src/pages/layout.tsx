import React, { useState } from 'react';
import '../assets/styles/layout.scss';
import { Link } from 'react-router-dom';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
  <div className='main'>
    <Navbar />
    <div className="navigationWrapper content-wrap">
      {children}
    </div>
  </div>
  );
};
export default Layout;

const Navbar = () =>{
  const [indexSelected, setIndexSelected] = useState(0)

  return(
    <div className='navbar-wrap'>
      <div className="info-wrap">
a
      </div>
      <div className="navigation-wrap">
        <LinkTag name="home" route="/" selected={indexSelected == 0} onSelect={() => setIndexSelected(0)} />
        <LinkTag name="mnist" route="/mnist" selected={indexSelected == 1} onSelect={() => setIndexSelected(1)} />
        <LinkTag name="xor" route="/xor" selected={indexSelected == 2} onSelect={() => setIndexSelected(2)} />
        <LinkTag name="line" route="/line" selected={indexSelected == 3} onSelect={() => setIndexSelected(3)} />
      </div>
    </div>
  )
}

type LinkProps = { name: string, route: string, selected?: boolean, onSelect: () => void };

const LinkTag = ({name, route, selected, onSelect}: LinkProps ) => {
  return(
    // <div >
    <Link onClick={onSelect} to={route} className={'linktag ' + (selected && 'selected') }>
      <div className="text-wrap">
        {name}

      </div>
    </Link>
    // </div>
  )
}