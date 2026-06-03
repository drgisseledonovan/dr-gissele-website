/* <JsonLd> — server component for injecting structured data.
   schema.org JSON-LD blocks help search engines and AI surfaces
   understand Dr. Gissele as a person/entity. Invisible to users.

   The payload is typed loosely as `Record<string, unknown>`
   because schema.org has hundreds of valid shapes; we trust the
   call site to construct a valid object. */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
