"use client";

import { useEffect } from "react";

import type {
  OrganizationSchema as OrganizationSchemaType,
  WebSiteSchema as WebSiteSchemaType,
  SoftwareApplicationSchema as SoftwareApplicationSchemaType,
  WebPageSchema as WebPageSchemaType,
  ServiceSchema as ServiceSchemaType,
  FAQPageSchema as FAQPageSchemaType,
} from "@/lib/schema";

interface SchemaScriptProps {
  schema:
    | OrganizationSchemaType
    | WebSiteSchemaType
    | SoftwareApplicationSchemaType
    | WebPageSchemaType
    | ServiceSchemaType
    | FAQPageSchemaType;
  id?: string;
}

export function SchemaScript({ schema, id }: SchemaScriptProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    if (id) {
      script.id = id;
    }
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [schema, id]);

  return null;
}

// Componentes específicos para cada tipo de schema
export function OrganizationSchema({
  schema,
}: {
  schema: OrganizationSchemaType;
}) {
  return <SchemaScript schema={schema} id="organization-schema" />;
}

export function WebSiteSchema({ schema }: { schema: WebSiteSchemaType }) {
  return <SchemaScript schema={schema} id="website-schema" />;
}

export function SoftwareApplicationSchema({
  schema,
}: {
  schema: SoftwareApplicationSchemaType;
}) {
  return <SchemaScript schema={schema} id="software-application-schema" />;
}

export function WebPageSchema({ schema }: { schema: WebPageSchemaType }) {
  return <SchemaScript schema={schema} id="webpage-schema" />;
}

export function ServiceSchema({ schema }: { schema: ServiceSchemaType }) {
  return <SchemaScript schema={schema} id="service-schema" />;
}

export function FAQPageSchema({ schema }: { schema: FAQPageSchemaType }) {
  return <SchemaScript schema={schema} id="faq-schema" />;
}

// Componente para múltiplos schemas
export function MultipleSchemas({
  schemas,
}: {
  schemas: Array<
    | OrganizationSchemaType
    | WebSiteSchemaType
    | SoftwareApplicationSchemaType
    | WebPageSchemaType
    | ServiceSchemaType
    | FAQPageSchemaType
  >;
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaScript key={index} schema={schema} id={`schema-${index}`} />
      ))}
    </>
  );
}
