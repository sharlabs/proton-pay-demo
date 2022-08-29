import React from "react";
import dynamic from 'next/dynamic';

const MainCom = dynamic(() => import('../components/Main'), {
  ssr: false,
});

const Main = () => {
  return <MainCom />;
};

export default Main;
