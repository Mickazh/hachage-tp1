import { readFile, writeFile } from "node:fs/promises";
import { getDate, monSecret } from "./divers.js";
import { NotFoundError } from "./errors.js";
import { createHash, randomUUID } from "node:crypto";
import { v4 } from "uuid";

/* Chemin de stockage des blocks */
const path = "./data/blockchain.json";

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = JSON.parse((await readFile(path)));
      resolve(data);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

/**
 * Trouve un block à partir de son id
 * @param partialBlock
 * @return {Promise<Block[]>}
 */
export async function findBlock(partialBlock) {
  // A coder
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
  const blocks = await findBlocks();
  if (blocks.length === 0) {
    return null;
  }
  return blocks[blocks.length - 1];
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
  const blocks = await findBlocks();
  const lastBlock = await findLastBlock();
  /**
   * ça fonctionne pas
   * @type Block
   */
  const block = {
    ...contenu,
    id: v4(),
    hash: lastBlock ? createHash("sha256").update(JSON.stringify(lastBlock)).digest("hex") : "",
    date: getDate(),
  };
  const newBlocks = [...blocks, block];
  writeFile(path, JSON.stringify(newBlocks));
  return newBlocks;
}
