import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { NEWFEED } from "../../api/api"
import { VideoLoading } from "../../components/Loading/Loading"
import Error from "../../Error/Error"
import { setApi } from "../../redux/actions"
import ItemVideo from "./ItemVideo/ItemVideo"

const Home: React.FC = () => {

  const dispath = useDispatch()
  const api = Object(useSelector<any>(item => item['api']))

  useEffect(() => {
    axios.get(NEWFEED).then((res: any) => {
      dispath(setApi(res.data))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {api
        ? api['status'] !== 'no data'
          ? api.map((datas: any) => datas.username && <ItemVideo key={uuidv4()} data={datas} big={false} />)
          : <Error title="Thông báo mới nhất từ TikTok" content="Bạn đã xem hết clip của hôm nay" feedback="Reload Page" top="15em" />
        : <VideoLoading />}
    </div>
  )
}

export default Home