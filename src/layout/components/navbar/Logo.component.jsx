import React from 'react';

function Logo({ hide, hideSide, toggleSide }) {
  return (
    <div
      className={`flex items-center justify-between bg-custom-main h-20 pl-5 transition-all ${
        hideSide ? 'w-[95px]' : 'w-[300px]'
      } ${hide ? 'bg-[#1e1e2d]' : 'bg-[#1A1A27]'}`}
    >
      <div className="flex items-center ">
        <img src="/icon/logo.svg" alt="" className="w-12 height-12 mr-2" />
        {!hideSide && (
          <div className="text-white">
            <span className="text-yellow-500">reliable</span>site
          </div>
        )}
      </div>

      {!hide && (
        <div
          className="hamburger pr-2 pl-2 flex items-center justify-center hover:bg-black/[.2] transition-all"
          onClick={toggleSide}
          onKeyPress={toggleSide}
          role="button"
          tabIndex={0}
          style={{ height: '100%' }}
        >
          <img
            src="/icon/dashboard-hamburger.svg"
            style={hideSide ? { transform: 'scaleX(-1)' } : {}}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default Logo;
