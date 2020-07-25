import * as React from 'react';

export const Navbar = () => {
  return (
    <nav className="bg-red-500 py-6">
      <div className="container flex flex-col lg:flex-row items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a href="/">
            <img style={{maxWidth: '8rem'}} src="/logo.svg" alt="NPM.click logo" />
          </a>
        </div>

        <div className="w-full block flex flex-1 justify-center items-center lg:justify-end lg:w-auto mt-5 lg:mt-0">
          <ul className="flex flex-row list-none">
              <li>
                <a
                  className={`px-2 py-3 lg:inline-block lg:mt-0 lowercase hover:text-blue-400`}
                  href="https://github.com/manosim/npm-click"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
