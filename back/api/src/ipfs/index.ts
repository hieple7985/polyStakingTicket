import { create } from "ipfs-http-client";
import { fromString } from "uint8arrays/from-string";

const id = "2DHjGrgthp03CHbg006NPpCnLzC";
const sercet = "43fb5d2eb34dd64956e5022ffc3c14c9";
const INFURA_TOKEN = Buffer.from(`${id}:${sercet}`).toString("base64");

export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + INFURA_TOKEN,
  },
});
const uploadImageToIPFS = async (file:any) => {
  const added = await ipfs.add(file, {
    progress: (prog) => console.log(`received: ${prog}`),
  });
  let v1CID = added.cid.toV1()
  return {
    image_link: `https://nts-v4.infura-ipfs.io/ipfs/${v1CID}`
  }
};

module.exports = uploadImageToIPFS;
export {};
