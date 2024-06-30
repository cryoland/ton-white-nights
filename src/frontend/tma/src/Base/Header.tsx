import { TonConnectButton } from "@tonconnect/ui-react";
import { FC } from "react";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <div className="block">
      <div className="flex justify-content-between flex-wrap">
        <div className="w-4 h-4rem flex justify-content-start align-items-center">
          <Link to="/">
            <Image
              src="/logo.png"
              alt="White Nights"
              width="50%"
              imageStyle={{ maxWidth: 200 }}
            ></Image>
          </Link>
        </div>
        <div className="w-8 h-4rem flex justify-content-end align-items-center">
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
};
