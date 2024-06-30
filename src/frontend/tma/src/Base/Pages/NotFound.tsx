import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => {
    return (
        <div>
            <p>404</p>
            <p><Link to="/">To main</Link></p>
        </div>
    )
}