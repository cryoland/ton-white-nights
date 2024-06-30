import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "primereact/image";

export const Footer: FC = () => {
  return (
    <div className="block flex justify-content-center  align-items-bottom">
        <div className="flex flex-row justify-content-center align-items-bottom">
          <Link to="https://cryoland.t.me" className="mr-1">
            <Image
              src="/cryoland.png"
              alt="Cryoland"
              width="20px"
              imageStyle={{ maxWidth: 40 }}
            ></Image>
          </Link>
          <Link to="https://cryoland.t.me">
            <div className="text-color-secondary">Made by Cryoland</div>
          </Link>
        </div>
    </div>
  );
};
