import { GetStaticPaths, GetStaticProps } from 'next';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
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

export default function Post(): JSX.Element {
  return (
    <>
      <Header />
      <article>
        <section className={styles.cover} />
        <section className={`${commonStyles.container} ${styles.content}`}>
          <h1>Criando um app CRA do zero</h1>
          <div className={commonStyles.postInfo}>
            <time>
              <FiCalendar />
              15 Mar 2021
            </time>
            <h4>
              <FiUser />
              Joseph Oliveira
            </h4>
            <h4>
              <FiClock />4 min
            </h4>
          </div>
          <h2>Proin et varius </h2>
          <p>
            Proin et varius Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam dolor sapien, vulputate eu diam at, condimentum
            hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra
            lectus auctor sed. Ut venenatis mauris vel libero pretium, et
            pretium ligula faucibus. Morbi nibh felis, elementuaposuere et,
            vulputate et erat. Nam venenatis. Cras laoreet mi Nulla auctor sit
            amet quam vitae commodo. Sed risus justo, vulputate quis neque eget,
            dictum sodales sem. In eget felis finibus, mattis magna a, efficitur
            ex. Curabitur vitae justo consequat sapien gravida auctor a non
            risus. Sed malesuada mauris nec orci congue, interdum efficitur urna
            dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium
            consectetur. Nunc congue. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Aliquam
            consectetur massa nec metus condimentum, sed tincidunt enim
            tincidunt. Vestibulum fringilla risus sit amet massa suscipit
            eleifend.
          </p>
          <h2>Proin et varius </h2>
          <p>
            Proin et varius Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam dolor sapien, vulputate eu diam at, condimentum
            hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra
            lectus auctor sed. Ut venenatis mauris vel libero pretium, et
            pretium ligula faucibus. Morbi nibh felis, elementum a posuere et,
            vulputate et erat. Nam venenatis. Cras laoreet mi Nulla auctor sit
            amet quam vitae commodo. Sed risus justo, vulputate quis neque eget,
            dictum sodales sem. In eget felis finibus, mattis magna a,{' '}
            <a href="#">efficiturex</a>. Curabitur vitae justo consequat sapien
            gravida auctor a non risus. Sed malesuada mauris nec orci congue,
            interdum efficitur urna dignissim. Vivamus cursus elit sem, vel
            facilisis nulla pretium consectetur. Nunc congue. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Aliquam consectetur massa nec metus condimentum, sed
            tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa
            suscipit eleifend.
          </p>
        </section>
      </article>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
