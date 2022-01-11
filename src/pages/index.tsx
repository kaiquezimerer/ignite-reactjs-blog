/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postPagination: PostPagination;
}

export default function Home({ postPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string>(null);

  const router = useRouter();

  useEffect(() => {
    setPosts(postPagination.results);
    setNextPage(postPagination.next_page);
  }, []);

  function goToPostPage(slug: string): void {
    router.push(`/post/${slug}`);
  }

  async function loadMorePosts(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results.map((post: Post) => {
        return {
          uid: post.uid,
          data: {
            title: post.data.title,
            subtitle: post.data.subtitle,
            author: post.data.author,
          },
          first_publication_date: format(
            new Date(post.first_publication_date),
            'dd LLL yyyy',
            {
              locale: ptBR,
            }
          ),
        };
      });

      setPosts([...posts, ...results]);
      setNextPage(data.next_page);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={commonStyles.container}>
      <Header />
      <section className={styles.content}>
        <ol>
          {posts.map(post => (
            <li key={post.uid} onClick={() => goToPostPage(post.uid)}>
              <h2>{post.data.title}</h2>
              <h3>{post.data.subtitle}</h3>
              <div className={commonStyles.postInfo}>
                <time>
                  <FiCalendar />
                  {post.first_publication_date}
                </time>
                <h4>
                  <FiUser />
                  {post.data.author}
                </h4>
              </div>
            </li>
          ))}
        </ol>
        {nextPage && (
          <button type="button" onClick={() => loadMorePosts(nextPage)}>
            Carregar mais posts
          </button>
        )}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 5,
    }
  );

  // Formatting data (posts)
  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd LLL yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });

  return {
    props: {
      postPagination: {
        results,
        next_page: postsResponse.next_page,
      },
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
