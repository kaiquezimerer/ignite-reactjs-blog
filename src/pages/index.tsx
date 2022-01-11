import { GetStaticProps } from 'next';

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
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <div className={commonStyles.container}>
      <Header />
      <section className={styles.content}>
        <ol>
          <li>
            <h2>Como utilizar Hooks</h2>
            <h3>Pensando em sincronização em vez de ciclos de vida.</h3>
            <div className={commonStyles.postInfo}>
              <time>
                <FiCalendar />
                15 Mar 2021
              </time>
              <h4>
                <FiUser />
                Joseph Oliveira
              </h4>
            </div>
          </li>
          <li>
            <h2>Como utilizar Hooks</h2>
            <h3>Pensando em sincronização em vez de ciclos de vida.</h3>
            <div>
              <time>
                <FiCalendar />
                15 Mar 2021
              </time>
              <h4>
                <FiUser />
                Joseph Oliveira
              </h4>
            </div>
          </li>
          <li>
            <h2>Como utilizar Hooks</h2>
            <h3>Pensando em sincronização em vez de ciclos de vida.</h3>
            <div>
              <time>
                <FiCalendar />
                15 Mar 2021
              </time>
              <h4>
                <FiUser />
                Joseph Oliveira
              </h4>
            </div>
          </li>
        </ol>
        <button type="button">Carregar mais posts</button>
      </section>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
