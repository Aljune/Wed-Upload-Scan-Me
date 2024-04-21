import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  data: string;
}

const QRCodeGenerator: React.FC<QRCodeProps> = ({ data }) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, data, function (error: any) {
        if (error) console.error(error);
      });
    }
  }, [data]);

  return <canvas ref={qrCodeRef}></canvas>;
};

export default QRCodeGenerator;
