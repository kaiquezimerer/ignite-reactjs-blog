import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>
          <Image
            src="/spacetraveling-logo.svg"
            alt="logo"
            width={238}
            height={25}
          />
        </h1>
      </Link>
    </header>
  );
}
