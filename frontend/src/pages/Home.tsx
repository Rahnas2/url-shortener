
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ShortenUrl from "../components/ShortenUrl"
import YourLinks from "../components/YourLinks"
import { getUserShortUrlsApi } from "../apis/urlApis"
import type { Url } from "../types/url"


const Home = () => {

    const [data, setData] = useState<Url []>([])
    const [isfetchingUrls, setIsFetchingUrls] = useState(false)

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                setIsFetchingUrls(true)
                const urls = await getUserShortUrlsApi()
                setData(urls)
            } catch (error) {
                console.error('error fetching urls ', error)
            } finally {
                setIsFetchingUrls(false)
            }
        }
        fetchUrls()
    }, [])

    // Handle Add New Url 
    const handleAddUrl = (newData: Url) => {
        setData([newData, ...data])
    }

    // Handle Delete Url Record
    const handleDeleteUrl = (id: string) => {
        setData(data.filter(d => d._id !== id))
    }

    return (
        <div className="">
            <Navbar />

            <div className="p-5 m-5 pt-30">
            <ShortenUrl onCreateSuccess={handleAddUrl}/>

            <YourLinks isLoading={isfetchingUrls} urlData={data} onDeleteSuccess={handleDeleteUrl} />

            </div>
        </div>
    )
}

export default Home