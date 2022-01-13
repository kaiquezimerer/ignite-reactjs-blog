/* eslint-disable react/no-danger */

import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';

import { format, minutesToHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Comments from '../../components/Comments';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  // Show loading message if the route is a fallback
  if (isFallback) {
    return <h1 className={styles.loading}>Carregando...</h1>;
  }

  // Format ISO date. Ex.: 10 Mar 2021
  function formatDate(date: string): string {
    return format(new Date(date), 'dd LLL yyyy', {
      locale: ptBR,
    });
  }

  // Calculate reading time based on the total number of words in the content (totalWords / 200)
  function calculateReadingTime(content): string {
    const getHeadingWordsPerMinutes = content.reduce((acc, currentValue) => {
      return currentValue.heading.split(/\s+/).length + acc;
    }, 0);

    const getBodyWordsPerMinutes = content.reduce((acc, currentValue) => {
      return RichText.asText(currentValue.body).split(/\s+/).length + acc;
    }, 0);

    const getWordsPerMinutes = Math.ceil(
      (getHeadingWordsPerMinutes + getBodyWordsPerMinutes) / 200
    );

    if (getWordsPerMinutes < 1) {
      return 'Menos de 1min';
    }

    if (getWordsPerMinutes < 60) {
      return `${getWordsPerMinutes} min`;
    }

    return `${minutesToHours(getWordsPerMinutes)} horas`;
  }

  return (
    <>
      <div className={commonStyles.container}>
        <Header />
      </div>
      <article className={styles.content}>
        <section
          className={styles.banner}
          style={{ backgroundImage: `url(${post.data.banner.url})` }}
        />
        <section className={commonStyles.container}>
          <h1>{post.data.title}</h1>
          <div className={commonStyles.postInfo}>
            <time>
              <FiCalendar />
              {formatDate(post.first_publication_date)}
            </time>
            <h4>
              <FiUser />
              {post.data.author}
            </h4>
            <h4>
              <FiClock />
              {calculateReadingTime(post.data.content)}
            </h4>
          </div>
          {post.data.content.map(elem => (
            <div key={elem.heading}>
              <h2>{elem.heading}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(elem.body) }}
              />
            </div>
          ))}
        </section>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.slug'],
    }
  );

  const params = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths: params,
    fallback: true,
  };
};

// SSG
export const getStaticProps: GetStaticProps = async props => {
  const { slug } = props.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
