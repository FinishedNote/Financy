const Navbar = () => {
  return (
    <nav className="w-full px-10">
      <ul className="flex gap-5">
        <li className="px-5 relative flex flex-col items-center">
          <a href="/" className="text-xl font-medium text-white">
            Home
          </a>
          <div className="w-full h-0.5 absolute -bottom-1.25 rounded-xl bg-tint"></div>
        </li>
        <li className="px-5 relative flex flex-col items-center">
          <a href="/about" className="text-xl font-medium text-tint-gray">
            About
          </a>
        </li>
        <li className="px-5 relative flex flex-col items-center">
          <a href="/settings" className="text-xl font-medium text-tint-gray">
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
