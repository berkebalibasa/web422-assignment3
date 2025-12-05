/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Berke Balibasa Student ID: 143982221 Date: 12-05-2025
*
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';

export default function Home() {

  const { token, setToken } = useContext(AuthContext);
  const { register, handleSubmit, formState:{errors} } = useForm();
  const router = useRouter();

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  }

  function onSubmit(form){
    const qs = Object.fromEntries(Object.entries(form).filter(([_,v]) => v !== ''));
    router.push({ pathname: '/books', query: qs });
  }

  return (
    <div className="container mt-4">

      {}
      <nav className="mb-4">
        <a href="/" className="me-3">Home</a>
        <a href="/books" className="me-3">Books</a>
        <a href="/favourites" className="me-3">Favourites</a>

        {!token ? (
          <a href="/login" className="btn btn-outline-primary btn-sm">Login</a>
        ) : (
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            Logout
          </button>
        )}
      </nav>
      {}

      <PageHeader text="Find Books" subtext="Search by author / title / subject / language / year"/>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Author *</label>
          <input
            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
            {...register('author', { required: 'Author is required' })}
          />
          {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
        </div>

        <div className="mb-2">
          <label className="form-label">Title</label>
          <input className="form-control" {...register('title')} />
        </div>

        <div className="mb-2">
          <label className="form-label">Subject</label>
          <input className="form-control" {...register('subject')} />
        </div>

        <div className="mb-2">
          <label className="form-label">Language</label>
          <input className="form-control" {...register('language')} placeholder="eng" />
        </div>

        <div className="mb-3">
          <label className="form-label">First Publish Year</label>
          <input className="form-control" {...register('first_publish_year')} placeholder="1979" />
        </div>

        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}
