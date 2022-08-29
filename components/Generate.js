import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  HeaderInner,
  InnerBox,
  Title,
  Header,
  Section,
  ConnectBtn
} from "./styles";
import QRCodeStyling from "qr-code-styling";
import {SigningRequest} from '@proton/signing-request';
import { JsonRpc, Api, Serialize } from '@proton/js';
import Link from 'next/link';
import {
  isMobile
} from "react-device-detect";
import Cal from "./Calculator";
const zlib = require('react-zlib-js')

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "svg",
  image:
    "./proton.svg",
  dotsOptions: {
    color: "rgb(117, 46, 235)",
    type: "extra-rounded"
  },
  cornersSquareOptions: {
    type: "extra-rounded"
  },
  cornersDotOptions: { type: 'square' },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.15, margin: 2 },
});


const Generate = () => {
  const [cal, setCal] = useState("");
  const [url, setUrl] = useState('');
  const ref = useRef(null);
  const rpc = new JsonRpc(process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS);
  const eos = new Api({
      rpc,
  })
  const chainId = process.env.PROTN_CHAINID;

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);
  const onGenerate = async () => {
    const info = await rpc.get_info();
    const head_block = await rpc.get_block(info.last_irreversible_block_num);
    const expiration = Serialize.timePointSecToDate(Serialize.dateToTimePointSec(head_block.timestamp) + 3600)
    const transaction = {
      expiration,
      ref_block_num: head_block.block_num & 0xffff, // 
      ref_block_prefix: head_block.ref_block_prefix,
      max_net_usage_words: 0,
      delay_sec: 0,
      context_free_actions: [],
      actions:[{
          account: 'xtokens',
          name: 'transfer',
          authorization: [{actor: '............1', permission: '............2'}],
          data: {from: '............1', to: 'hashman', quantity: `${cal}.000000 XUSDC`, memo: 'payments'},
      }],
      transaction_extensions: [],
      signatures: [],
      context_free_data: []
    };
    const opts = {
      zlib: {
        deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
        inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
      },
      abiProvider: {
        getAbi: async (account) => (await eos.getAbi(account))
      }
    }
  
    const request = await SigningRequest.create({ transaction, chainId }, opts);
    const uri = request.encode();
    let realUrl = uri.substring(uri.indexOf(':'), uri.length);
    qrCode.update({
      data: `proton${realUrl}`
    });
    setUrl(`proton${realUrl}`);
  }
  return (
    <Container>
    <Header>
      <HeaderInner>
        <img src="/proton.svg" layout="responsive" width="50" height="50" />
        <div style={{display: 'flex', width: '165px', alignItems: 'center', justifyContent: 'space-around'}}>
          <Link href="/"><a>Home</a></Link>
          <Link href="/generate"><a>Generate</a></Link> 
        </div>
      </HeaderInner>
    </Header>
      <Section>
        <InnerBox>
          <Title>Proton Pay</Title>
          {url == '' ? 
            <>
                <h3>Enter amount in XUSDC</h3>
                <Cal cal={cal} setCal={setCal} />
                <ConnectBtn style={{height: '50px', width: '200px', margin: 0}} onClick={onGenerate}>Generate Payment Code</ConnectBtn>
            </> :  
            <>
              <h4 style={{color: 'grey'}}>Total</h4>
              <h3 style={{fontSize: '48px', fontWeight: 'bold'}}>
                {cal}
              </h3>
              <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>XUSDC</h2>
            </>
          }
          <div ref={ref} onClick={() => {
              if(isMobile){
                return window.open(url);
              }
          }}/>
          {url != '' ? <h2 style={{textAlign: 'center', fontWeight: 'bold'}}>QR click on mobile</h2> : null}
        </InnerBox>
      </Section>
    </Container>
  );
};

export default Generate;
