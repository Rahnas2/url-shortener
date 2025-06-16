import type React from "react"
import type { Url } from "../types/url"
import UrlDetailsCard from "./UrlDetailsCard"
import Spinner from "./Spinner"

type Props = {
    isLoading: boolean,
    urlData: Url[],
    onDeleteSuccess: (id: string) => void
}
const YourLinks: React.FC<Props> = ({ isLoading, urlData, onDeleteSuccess }) => {
    return (
        <div className="mt-5">

            {/* Heading */}
            <div className="flex justify-between">
                <h1 className="text-lg text-accent font-medium">Your Links</h1>
                <div className="opacity-50">0 Links</div>
            </div>

            {isLoading ? (
                <div className="flex justify-center mt-30"><Spinner/></div>
            ) : urlData.length === 0 ? (
                <div className="text-center opacity-50 mt-30">No data available</div>
            ) : (
                <>
                    {urlData.map((item, index) => (
                        <UrlDetailsCard key={index} data={item} onDeleteSuccess={onDeleteSuccess} />
                    ))}
                </>
            )}


        </div>
    )
}

export default YourLinks