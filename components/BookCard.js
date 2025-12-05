import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (...a) => fetch(...a).then(r => r.json());

export default function BookCard({ workId }){
  const { data } = useSWR(`https://openlibrary.org/works/${workId}.json`, fetcher);

  if(!data){
    return (
      <div className="card">
        <div className="card-body">Loading…</div>
      </div>
    );
  }

  const title = data?.title ?? '';
  const first = data?.first_publish_date ?? 'N/A';
  const coverId = data?.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '/no_book_cover.jpg';

  return (
    <div className="card h-100">
      <img
        className="card-img-top"
        src={imgSrc}
        alt={title}
        onError={(e)=>{ e.currentTarget.src='/no_book_cover.jpg'; }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{first}</p>
        <Link href={`/works/${workId}`}>View details</Link>
      </div>
    </div>
  );
}
