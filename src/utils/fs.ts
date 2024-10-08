import fs from "fs/promises";
import path from "path";
import type { CollectionKey } from "astro:content";

export const writeEntry = async (
  collection: CollectionKey,
  filename: string,
  content: string
) => {
  await fs.writeFile(`./src/content/${collection}/${filename}`, content);
};

export const deleteEntry = async (
  collection: CollectionKey,
  filename: string
) => {
  await fs.unlink(`./src/content/${collection}/${filename}`);
};

export const getEntryExtension = async ({
  collection,
  id,
}: {
  collection: CollectionKey;
  id: string;
}): Promise<string> => {
  const files = await fs.readdir(`./src/content/${collection}`, {
    withFileTypes: true,
  });
  const file = files.find(
    (file) => file.isFile() && path.parse(file.name).name === id
  );
  if (!file) throw new Error("Couldn't find the file");
  return path.parse(file.name).ext;
};
