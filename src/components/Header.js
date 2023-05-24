import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#"><img className="header__logo" alt="Логотип Место"
        src={logo} /></a>
    </header>
  )
}

export default Header;
