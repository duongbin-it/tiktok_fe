import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { NEWFEED } from "../../api/api";
import { ConnectApi } from "../../components/GlobalFunction/GlobalFunction";
import { VideoLoading } from "../../components/Loading/Loading";
import { setApi } from "../../redux/actions";
import ItemVideo from "./ItemVideo/ItemVideo";

const Home: React.FC = () => {

  const dispath = useDispatch();
  const api = Object(useSelector<any>(item => item['api']))

  useEffect(() => {
    ConnectApi(NEWFEED, "GET").then((res: any) => {
      dispath(setApi(res.data))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {api[0]
        ? api.map((datas: any) => datas.username && <ItemVideo key={uuidv4()} data={datas} big={false} />)
        : <VideoLoading />}
    </div>
  );
}

export default Home;