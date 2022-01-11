/* eslint-disable react/no-danger */

import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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
              {post.first_publication_date}
            </time>
            <h4>
              <FiUser />
              {post.data.author}
            </h4>
            <h4>
              <FiClock />4 min
            </h4>
          </div>
          {post.data.content.map(elem => (
            <>
              <h2>{elem.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: elem.body[0].text }} />
            </>
          ))}
        </section>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  // // TODO
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async props => {
  const { slug } = props.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd LLL yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(item => {
        return {
          heading: item.heading,
          body: [{ text: RichText.asHtml(item.body) }],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 30 * 60,
  };
};
