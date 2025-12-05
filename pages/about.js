import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";
import { Card } from "react-bootstrap";

export default function About({ book }) {
  return (
    <Layout>
      <PageHeader text="About the Developer - Berke Balibasa" />
      <Card className="mb-4">
        <Card.Body>
          <p>
            Hi, my name is Berke and this project is for WEB422 assignment-2.
          </p>
          <p>
            The app uses Next.js, React-Bootstrap and the OpenLibrary API to show book information.
          </p>
        </Card.Body>
      </Card>

      <h5>Featured Book: Harry Potter</h5>
      <BookDetails book={book} />
    </Layout>
  );
}

// Hobbit
export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL82563W.json");
  const book = await res.json();

  return {
    props: { book },
  };
}
