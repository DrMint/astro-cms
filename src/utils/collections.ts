import {
  getEntry,
  z,
  type CollectionKey,
  type ContentCollectionKey,
  type DataCollectionKey,
} from "astro:content";
import { collections } from "../content/config";
import { isDefined, isUndefined } from "./asserts";
import path from "path";
import { getEntryExtension } from "./fs";

export const isDataCollectionSlug = (
  slug: CollectionKey
): slug is DataCollectionKey => collections[slug].type === "data";

export const isContentCollectionSlug = (
  slug: CollectionKey
): slug is ContentCollectionKey => collections[slug].type === "content";

export const isValidCollectionSlug = (slug: string): slug is CollectionKey =>
  Object.keys(collections).includes(slug);

export interface FormContext {
  optional?: boolean | undefined;
  default?: any | undefined;
  label?: string | undefined;
  description?: string | undefined;
}

export type EntryContext = {
  collectionSlug: CollectionKey;
  entrySlug: string;
  extension: string;
  schema?: z.ZodObject<any> | undefined;
  hasBody: boolean;
  document?:
    | {
        id: string;
        slug?: string;
        body?: string;
        data: any;
      }
    | undefined;
};

export const getEntryContext = async ({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}): Promise<EntryContext> => {
  if (!isValidCollectionSlug(collection)) {
    throw new Error("Collection slug is not valid");
  }
  const { schema } = collections[collection];

  if (isDefined(schema)) {
    if (typeof schema === "function") {
      throw new Error("Schema is a function");
    }

    if (!(schema instanceof z.ZodObject)) {
      throw new Error("Schema is not a ZodObject");
    }
  }

  if (isContentCollectionSlug(collection)) {
    const document = await getEntry({
      collection,
      slug,
    });

    if (isUndefined(document)) {
      return {
        collectionSlug: collection,
        entrySlug: "new",
        extension: ".md",
        hasBody: true,
        schema,
      };
    }

    return {
      collectionSlug: collection,
      entrySlug: slug,
      extension: path.parse(document.id).ext,
      hasBody: true,
      document,
      schema,
    };
  } else {
    const document = await getEntry({
      collection,
      id: slug,
    });

    if (isUndefined(document)) {
      return {
        collectionSlug: collection,
        entrySlug: "new",
        extension: ".json",
        hasBody: false,
        schema,
      };
    }

    return {
      collectionSlug: collection,
      entrySlug: slug,
      extension: await getEntryExtension({ collection, id: document.id }),
      hasBody: false,
      document,
      schema,
    };
  }
};
