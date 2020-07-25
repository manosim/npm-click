import * as React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white text-sm py-10 px-3">
      <div className="container flex flex-col item-center text-center">
        <div className="my-3">
          Copyright ©{' '}
          <a className="hover:text-blue-400" href="/">
            NPM.click
          </a>{' '}
          {new Date().getFullYear()}. Developed by{' '}
          <a
            className="hover:text-blue-400"
            href="https://www.manos.im/"
            rel="noopener noreferrer"
          >
            Emmanouil Konstantinidis
          </a>
          .
        </div>
      </div>
    </div>
  );
};
