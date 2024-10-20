function Header() {
  return (
    <header className="py-4 bg-gray-50">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-3xl font-bold text-orange-500">fridge assistant</h1>
      </div>
      <nav className="mt-4 flex justify-center space-x-8">
        <a href="/" className="text-xl text-black hover:text-orange-500">
          Home
        </a>
        <a href="/about" className="text-xl text-black hover:text-orange-500">
          About
        </a>
      </nav>
    </header>
  );
}

export default Header;
