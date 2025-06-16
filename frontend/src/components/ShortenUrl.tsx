import Box from "@mui/material/Box"

import AddIcon from '@mui/icons-material/Add';
import { CustomTextField } from "./CustomTextField";
import type { Url } from "../types/url";
import type React from "react";
import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import { createShortUrlApi } from "../apis/urlApis";
import toast from "react-hot-toast";
import { isValidUrl } from "../validation/urlValidation";

type Props = {
    onCreateSuccess: (newData: Url) => void
}

const ShortenUrl: React.FC<Props> = ({ onCreateSuccess }) => {

    const [isCreating, setIsCreating] = useState(false)
    const [originalUrl, setOriginalUrl] = useState('')

    const [urlError, setUrlError] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setOriginalUrl(value)
    }

    // Debounce validation on originalUrl change
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (originalUrl.trim() === '') {
                setUrlError(false);
                return;
            }
            const isValid = isValidUrl(originalUrl.trim());
            setUrlError(!isValid);
        }, 500);

        return () => clearTimeout(timeout);
    }, [originalUrl]);

    const handleCreateShortUrl = async () => {
        try {
            if (!isValidUrl(originalUrl.trim())) return setUrlError(true)

            setIsCreating(true)
            const result = await createShortUrlApi(originalUrl.trim())
            onCreateSuccess(result)
            setOriginalUrl('')
            toast.success('Created')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'something went wrong')
            console.error('error crating short url ', error)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div >
            <h1 className="text-center text-2xl font-bold text-accent mb-2">Shorten Your URL</h1>
            <div className="text-center text-sm">Transform long URLs into short, shareable links</div>

            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <CustomTextField onChange={handleChange} id="original-url" label="Original Url" placeholder="https://example.com/your-long-url" value={originalUrl} fullWidth variant="outlined" error={urlError} helperText={"invalid Url"} />

                <CustomButton onClick={handleCreateShortUrl} loading={isCreating} fullWidth startIcon={<AddIcon />}>
                    Shorten Url
                </CustomButton>

            </Box>




        </div>
    )
}

export default ShortenUrl