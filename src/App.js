import React from 'react';
import './App.css';
import useWindowSize from './hooks/useWindowSize';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import About from './components/About';
import Contact from './components/Contact';
import useAuthUser from './hooks/useAuthUser';
import { Route, Redirect } from 'react-router-dom';

export default function App() {
  const page = useWindowSize();
  const user = useAuthUser();

  if (!user) {
    return (
      <>
        <Route exact path="/" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </>
    );
  }
  return (
    <div className="app" style={{ ...page }}>
      <Redirect to={page.isMobile ? '/chats' : '/'} />
      <div
        className="app__body"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dm89xfnl4/image/upload/v1632497132/hannah-lim-U6nlG0Y5sfs-unsplash_c242no.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Sidebar user={user} page={page} />
        <Route path="/room/:roomID">
          <Chat user={user} page={page} />
        </Route>
      </div>
    </div>
  );
}
