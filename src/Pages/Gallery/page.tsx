import { useEffect, useState } from 'react';
import GalleryComponent from '../../components/container/Gallery/GalleryContainer';
import { useLocation } from 'react-router-dom';

const GalleryPage = () => {

    const [user, setUser] = useState<string>('user');

    const location = useLocation();
    const { pathname } = location;

    const init = () => {
        if(pathname === '/admin-gallery'){
            setUser('admin');
        }
    }
    useEffect(init,[pathname]);

    return (
        <>
            <GalleryComponent role={user}/>
        </>
    );
  };
export default GalleryPage;