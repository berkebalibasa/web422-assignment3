export default function PageHeader({ text, subtext }){
  return (
    <div className="mt-4 mb-3">
      <h1 className="h3 m-0">{text}</h1>
      {subtext ? <p className="text-muted m-0">{subtext}</p> : null}
    </div>
  );
}
