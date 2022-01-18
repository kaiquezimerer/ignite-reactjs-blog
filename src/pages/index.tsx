import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
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
  preview: boolean;
  postsPagination: PostPagination;
}

interface IgetStaticProps {
  preview?: boolean;
  previewData: {
    ref: string;
  };
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);

  // Format ISO date. Ex.: 10 Mar 2021
  function formatDate(date: string): string {
    return format(new Date(date), 'dd LLL yyyy', {
      locale: ptBR,
    });
  }

  // Load and render more posts from Prismic API (Pagination)
  async function handleLoadMorePosts(url: string): Promise<void> {
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
          first_publication_date: formatDate(post.first_publication_date),
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
            <li key={post.uid}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <h2>{post.data.title}</h2>
                  <h3>{post.data.subtitle}</h3>
                  <div className={commonStyles.postInfo}>
                    <time>
                      <FiCalendar />
                      {formatDate(post.first_publication_date)}
                    </time>
                    <h4>
                      <FiUser />
                      {post.data.author}
                    </h4>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ol>
        {nextPage && (
          <button type="button" onClick={() => handleLoadMorePosts(nextPage)}>
            Carregar mais posts
          </button>
        )}
      </section>
      {preview && (
        <aside>
          <div className={commonStyles.previewButton}>
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}

// SSG
export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}: IgetStaticProps) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 3,
      orderings: '[document.last_publication_date desc]',
      ref: previewData?.ref ?? null,
    }
  );

  // Formatting props (post list)
  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      first_publication_date: post.first_publication_date,
    };
  });

  return {
    props: {
      postsPagination: {
        results,
        next_page: postsResponse.next_page,
      },
      preview,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
