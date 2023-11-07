const Header = ({ logo }) => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="" />
      </div>
    </header>
  );
};

export default Header;
