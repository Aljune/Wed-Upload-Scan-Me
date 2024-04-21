import React from 'react';
import QRCodeGenerator from '../../components/container/commons/QRCodeGenerator';

const QRCodePage: React.FC = () => {
    const mainPath = window.location.origin + '/';
console.log(mainPath);
    const qrData = mainPath;
    
    return (
        <>
            <QRCodeGenerator data={qrData}/>
        </>
    );
  };
export default QRCodePage;