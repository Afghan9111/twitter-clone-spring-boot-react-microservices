import '../styles/universal.css';
import '../styles/pages-styles/HomePage.css';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostingArea from '../components/PostingArea';

export default function HomePage() {

  useEffect(() => { document.title = "Home" }, []);
  const { authUser } = useAuth();

  return (
    <div className='homePageContainer'>
      <PostingArea userInfo={authUser} />
    </div>
  );
}