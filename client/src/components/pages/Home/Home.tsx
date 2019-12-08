import React, { useCallback, useEffect } from 'react';
import ArticleListContainer from '../../../containers/ArticleList';
import FeedResisterForm from '../../../components/FeedResisterForm/FeedResisterForm';
import Button from '../../../components/Button/Button';
import firebase from '../../../utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { TUser } from '../../../modules/schema/user';
import { fetchArticlesRequest } from '../../../modules/article';

const provider = new firebase.auth.GoogleAuthProvider();

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector<{ user: TUser }, TUser>((state) => state.user)
  
  useEffect(() => {
    dispatch(fetchArticlesRequest())
  }, [])

  const onLogIn = useCallback(() => {
    firebase.auth().signInWithPopup(provider).catch(err => {
      console.error(err)
    })
  }, [])

  const onLogOut = useCallback(() => {
    firebase.auth().signOut().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className="App">
      {user.loggedIn
        ? <Button onClick={onLogOut}>ログアウト</Button>
        : <Button onClick={onLogIn}>ログイン</Button>
      }
      <FeedResisterForm />
      <ArticleListContainer />
    </div>
  );
}

export default Home;
