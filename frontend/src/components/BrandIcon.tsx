
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import type React from 'react';

type Props = {
    mode?: string
}
const BrandIcon: React.FC<Props> = ({mode}) => {
    return (
        <div className={`text-center ${mode === 'auth' ? 'block mb-3': 'flex items-center'}`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-secondary rounded-2xl animate-bounce-subtle ${mode === 'auth' ? 'mb-4': 'mr-2'}`}>
                <InsertLinkIcon fontSize='large' className="w-8 h-8 text-white rotate-45" />
            </div>
            <h1 className="text-3xl font-bold text-accent ">
                ShortLink
            </h1>
        </div>
    )
}

export default BrandIcon