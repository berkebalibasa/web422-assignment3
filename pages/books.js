import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

const fetcher = (...args) => fetch(...args).then(r=>r.json());

export default function Books(){
  const router = useRouter();
  const [page, setPage] = useState(1);

  const filters = Object.entries(router.query).map(([k,v])=>`${k}: ${v}`).join(' | ');
  const qs = new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    qs ? `https://openlibrary.org/search.json?${qs}&page=${page}&limit=10` : null,
    fetcher
  );

  if(error) return <div className="container mt-4 text-danger">Failed to load.</div>;
  if(!data)  return <div className="container mt-4">Loading…</div>;

  return (
    <div className="container mt-4">
      <PageHeader text="Search Results" subtext={filters || 'No filters'} />

      <table className="table table-striped">
        <thead><tr><th>Title</th><th>Author(s)</th><th>Year</th></tr></thead>
        <tbody>
          {data.docs?.map(doc=>{
            const workId = (doc.key || '').replace('/works/','');
            return (
              <tr key={doc.key}>
                <td><Link href={`/works/${workId}`}>{doc.title}</Link></td>
                <td>{(doc.author_name||[]).join(', ')}</td>
                <td>{doc.first_publish_year || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <button className="btn btn-outline-secondary" onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
