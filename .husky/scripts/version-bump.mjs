#!/usr/bin/env node

/**
 * Script para incrementar automaticamente a versão do projeto no package.json
 * Este script incrementa o último número da versão semântica (patch)
 */

// Usando fs/promises para operações de arquivo mais modernas
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Obter o diretório atual em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o package.json (ajustado para o novo local do script)
const packageJsonPath = path.join(__dirname, "../..", "package.json");

async function incrementVersion() {
  try {
    // Lê o arquivo package.json
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);

    // Obtém a versão atual
    const currentVersion = packageJson.version;

    // Divide a versão em partes (major.minor.patch)
    const versionParts = currentVersion.split(".");

    // Incrementa o número do patch (última posição)
    versionParts[2] = (parseInt(versionParts[2]) + 1).toString();

    // Junta as partes novamente para formar a nova versão
    const newVersion = versionParts.join(".");

    // Atualiza a versão no objeto packageJson
    packageJson.version = newVersion;

    // Escreve o objeto atualizado de volta ao arquivo
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    );

    console.log(`✅ Versão incrementada: ${currentVersion} -> ${newVersion}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar a versão:", error);
    process.exit(1);
  }
}

incrementVersion();
