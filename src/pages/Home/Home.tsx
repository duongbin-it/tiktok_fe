import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NEWFEED } from "../../api/api";
import { ConnectApi } from "../../components/GlobalFunc/GlobalFunc";
import { VideoLoading } from "../../components/Loading/Loading";
import ItemVideo from "./ItemVideo/ItemVideo";


const Home: React.FC = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    ConnectApi(NEWFEED, "GET").then((res) => {
      setApi(res);
    })
  }, []);

  return (
    <div>
      {api ? (
        api.data.map((datas: any) =>
          (() => {
            if (datas.username) {
              return (
                <ItemVideo key={uuidv4()} data={datas} big={false} />
              )
            }
          })()
        )
      ) : <VideoLoading />}
    </div>
  );
}

export default Home;
