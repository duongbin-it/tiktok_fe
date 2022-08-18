import React, { useEffect, useState } from "react";
import { ConnectApi } from "../../components/GlobalFunc/GlobalFunc";
import Loading from "../../components/HomeLoading/HomeLoading";
import ItemVideo from "./ItemVideo/ItemVideo";


const Home: React.FC = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    (function Newfeed() {
      ConnectApi("https://tiktok-nodejs1.herokuapp.com/api/newfeed", "GET").then((res) => {
        localStorage.setItem("CountVideo", res?.data.length || '');
        setApi(res);
      });
    })()
  }, []);

  return (
    <div>
      {api ? (
        api.data.map((datas: any) =>
          (() => {
            if (datas.username) {
              return (
                <ItemVideo key={datas['_id']} data={datas} big={false} />
              )
            }
          })()
        )
      ) : <Loading />}
    </div>
  );
}

export default Home;
