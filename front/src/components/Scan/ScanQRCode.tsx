import React, { useEffect, memo } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeResult, Html5QrcodeScanType, Html5QrcodeSupportedFormats, QrDimensionFunction, QrDimensions } from 'html5-qrcode/esm/core';
import { Html5QrcodeCameraScanConfig, Html5QrcodeConfigs } from 'html5-qrcode/esm/html5-qrcode';


const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodeScannerConfig extends Html5QrcodeCameraScanConfig, Html5QrcodeConfigs {
  rememberLastUsedCamera?: boolean | undefined;
  supportedScanTypes: Array<Html5QrcodeScanType> | [];
}

interface Props {
  fps: number | undefined;
  qrbox?: number | QrDimensions | QrDimensionFunction | undefined;
  aspectRatio?: number | undefined;
  disableFlip?: boolean | undefined;
  verbose?: boolean | undefined;
  qrCodeSuccessCallback?: (decodeText: string, decodedResult: Html5QrcodeResult ) => void;
  qrCodeErrorCallback?: () => void;
}

const ScanQRCode: React.FC<Props> = (props: Props): React.ReactElement => {
  useEffect(() => {
    const createConfig = (props: Props) => {
      const config: Html5QrcodeScannerConfig = 
      {
        fps: props.fps,
        qrbox: props.qrbox,
        aspectRatio: props.aspectRatio,
        disableFlip: props.disableFlip,
        formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
        supportedScanTypes: [],
      };
      return config;
    }

    const config: Html5QrcodeScannerConfig = createConfig(props);
    const verbose = props.verbose === true;

    if (!(props.qrCodeSuccessCallback)) {
      const errorMassage = {code: 403, message: "qrCodeSuccessCallback is required callback."}
      throw errorMassage;
    }

    const scanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    scanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    const clearScanner = () => {
      try {
        scanner.clear()
      }
      catch(error) {
        console.error("Failed to clear scanner. ", error);
      }
    }
    return () => clearScanner();
  }, [])

  return (
    <div id={qrcodeRegionId}></div>
  )
}

export default memo(ScanQRCode)