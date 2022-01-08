import { GetStaticProps } from 'next';
import Image from 'next/image';

import { getPrismicClient } from '../services/prismic';

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
    <>
      <header>
        <h1>
          <Image
            src="/spacetraveling-logo.png"
            alt="Logo do Spacetraveling"
            width={238}
            height={25}
          />
        </h1>
      </header>
      <section>
        <ol>
          <li>
            <h2>Título</h2>
            <p>Resumo</p>
            <div>
              <date>15 Mar 2021</date>
              <p>Joseph Oliveira</p>
            </div>
          </li>
        </ol>
        <button type="button">Carregar mais posts</button>
      </section>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
