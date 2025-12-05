import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

import { addToFavourites, removeFromFavourites } from '@/lib/userData';

function normalizeDescription(desc) {
  if (!desc) return 'No description.';
  if (typeof desc === 'string') return desc;
  if (typeof desc === 'object' && desc.value) return desc.value;
  return 'No description.';
}

function coverUrl(coverId) {
  if (!coverId) return '/no_book_cover.jpg';
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {

// Jotai global favourites list
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

// Default value must be false
  const [showAdded, setShowAdded] = useState(false);
  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  async function favouritesClicked() {
    if (showAdded) {
// If currently added → remove
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  const title = book?.title ?? 'Untitled';
  const first = book?.first_publish_date ?? 'N/A';
  const subjects = Array.isArray(book?.subjects) ? book.subjects.slice(0, 8) : [];
  const coverId = Array.isArray(book?.covers) ? book.covers[0] : undefined;
  const description = normalizeDescription(book?.description);

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <img
          src={coverUrl(coverId)}
          alt={title}
          className="img-fluid rounded"
          onError={(e) => {
            e.currentTarget.src = '/no_book_cover.jpg';
          }}
        />
      </div>

      <div className="col-lg-8">
        <h2 className="h4 mb-2">{title}</h2>
        <p className="text-muted mb-1">
          First Publish Date: <strong>{first}</strong>
        </p>

        {subjects.length > 0 && (
          <p className="mb-2">
            <span className="text-muted">Subjects: </span>
            {subjects.join(', ')}
          </p>
        )}

        <div className="mb-3" style={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </div>

        {showFavouriteBtn && (
          <button
            className={`btn ${showAdded ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={favouritesClicked}
          >
            {showAdded ? '+ Favourite (added)' : '+ Favourite'}
          </button>
        )}
      </div>
    </div>
  );
}
