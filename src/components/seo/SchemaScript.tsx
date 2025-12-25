/**
 * Component to render JSON-LD schema markup
 */

type SchemaScriptProps = {
  schema: string;
};

export function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}

