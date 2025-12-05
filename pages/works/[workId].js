import useSWR from 'swr';
import { useRouter } from 'next/router';
import BookDetails from '@/components/BookDetails';

const fetcher = (...args) => fetch(...args).then(r=>r.json());

export default function WorkPage(){
  const { query:{ workId } } = useRouter();
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  if(error) return <div className="container mt-4 text-danger">Failed to load.</div>;
  if(!data)  return <div className="container mt-4">Loading…</div>;

  return <div className="container mt-4"><BookDetails book={data} workId={workId} /></div>;
}
