import React from "react";
import dynamic from 'next/dynamic';

const Generate = dynamic(() => import('../components/Generate'), {
  ssr: false,
});
const Main = () => {
    return <Generate />;
};

export default Main;
