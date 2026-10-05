import styles from './TagList.module.scss';

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul role="list" className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
