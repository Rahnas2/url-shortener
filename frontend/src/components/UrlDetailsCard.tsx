import IconButton from "@mui/material/IconButton"
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { Url } from "../types/url";
import type React from "react";
import { useState } from "react";
import { deleteShortUrlApi } from "../apis/urlApis";
import toast from "react-hot-toast";

type Props = {
    data: Url,
    onDeleteSuccess: (id: string) => void
}
const UrlDetailsCard: React.FC<Props> = ({data, onDeleteSuccess}) => {

    const [copied, setCopied] = useState(false);

    const shortUrl = `${import.meta.env.VITE_BACKEND_URI}/api/url/${data.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500); 
    } catch (err) {
      console.error("Failed to copy!");
    }
  };

  const handleRedirect = () => {
    window.open(data.originalUrl, "_blank");
  };

  const handleDelete = async() => {
    try {
        await deleteShortUrlApi(data.shortCode)
        onDeleteSuccess(data._id)
        toast.success('success')
    } catch (error) {
        console.error('error deleting short url ')
        toast.error('something went wrong')
    }
  }
    return (
        <div className="bg-secondary my-2 p-3 rounded-md shadow-2xl flex flex-col gap-3">

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-accent font-medium mr-2 text-lg">api/url/{data.shortCode}</div>
                    <IconButton color="inherit" aria-label="copy" onClick={handleCopy} >
                        {copied ? <span className="text-sm text-accent">Copied</span> : <ContentCopyIcon />}
                    </IconButton>

                    <IconButton color="info" aria-label="link" onClick={handleRedirect} >
                        <LaunchIcon />
                    </IconButton>
                </div>

                <IconButton color="error"  className="text-end" aria-label="delete" onClick={handleDelete} >
                    <DeleteForeverIcon />
                </IconButton>

            </div>

            <div className="text-sm">{data.originalUrl}</div>

            <div className="flex items-center gap-2">
                <DateRangeIcon fontSize="small"/> 
                <span>Created {new Date(data.createdAt).toLocaleDateString()}</span>
            </div>

        </div>
    )
}

export default UrlDetailsCard