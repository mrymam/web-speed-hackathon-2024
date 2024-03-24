// import { useRef } from 'react';
import styled from 'styled-components';

import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

import { getImageUrl } from '../../../lib/image/getImageUrl';

const _Canvas = styled.canvas`
  height: 100%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

const genImage = async (pageImageId) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const image = new Image();
  image.src = getImageUrl({
    format: 'webp',
    imageId: pageImageId,
  });
  await image.decode();

  const canvas = ref.current;
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d');

  decrypt({
    exportCanvasContext: ctx,
    sourceImage: image,
    sourceImageInfo: {
      height: image.naturalHeight,
      width: image.naturalWidth,
    },
  });

  canvas.setAttribute('role', 'img');
  const hoge = canvas.toBlob()
  console.log(hoge)

  // // ctx.toBlob
  //  <_Canvas ref={ref} />
};

genImage("822c4cb2-8aea-4d2d-9bb1-794f259b48c4")
// "822c4cb2-8aea-4d2d-9bb1-794f259b48c4"
