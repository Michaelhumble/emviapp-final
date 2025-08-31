// scripts/codemods/normalize-analytics.ts
import { Project, SyntaxKind } from "ts-morph";
import path from "node:path";
import fs from "node:fs";

const project = new Project({
  skipAddingFilesFromTsConfig: true,
  tsConfigFilePath: "tsconfig.json",
});

const SRC = "src";

function addImport(sourceFile: any, named: string, from: string) {
  const existing = sourceFile.getImportDeclarations().find((d: any) => d.getModuleSpecifierValue() === from);
  if (existing) {
    const namedImports = new Set(existing.getNamedImports().map((ni: any) => ni.getName()));
    if (!namedImports.has(named)) existing.addNamedImport(named);
    return;
  }
  sourceFile.addImportDeclaration({ moduleSpecifier: from, namedImports: [named] });
}

function isIdentifier(node: any, name: string) {
  return node && node.getKind() === SyntaxKind.Identifier && node.getText() === name;
}

function literalText(node: any): string | null {
  if (node?.getKind() === SyntaxKind.StringLiteral) return node.getLiteralText();
  return null;
}

function processFile(sourceFile: any) {
  let changed = false;

  // Replace gtag('event', 'name', {...}) and window.gtag('event', 'name', {...})
  sourceFile.forEachDescendant((node: any) => {
    if (node.getKind() !== SyntaxKind.CallExpression) return;

    const call = node;
    const expr = call.getExpression();

    // gtag(...) or window.gtag(...)
    const isGtag =
      isIdentifier(expr, "gtag") ||
      (expr.getKind() === SyntaxKind.PropertyAccessExpression &&
        expr.getExpression().getText() === "window" &&
        expr.getName() === "gtag");

    if (!isGtag) return;

    const args = call.getArguments();
    if (!args.length) return;

    const cmd = literalText(args[0]);
    if (!cmd) return;

    // gtag('event', 'name', params)
    if (cmd === "event" && args.length >= 2) {
      const nameArg = args[1];
      const name = literalText(nameArg);
      const params = args[2] ? args[2].getText() : "{}";

      if (name) {
        addImport(sourceFile, "logEvent", "@/lib/analytics.compat");
        call.replaceWithText(`logEvent(${JSON.stringify(name)}, ${params})`);
        changed = true;
      }
      return;
    }

    // gtag('consent','update', params)
    if (cmd === "consent" && literalText(args[1]) === "update") {
      const p = args[2] ? args[2].getText() : "{}";
      addImport(sourceFile, "gtagConsentUpdate", "@/lib/analytics.compat");
      call.replaceWithText(`gtagConsentUpdate(${p})`);
      changed = true;
      return;
    }

    // gtag('config','G-XXXX', params?)
    if (cmd === "config" && typeof literalText(args[1]) === "string") {
      const id = JSON.stringify(literalText(args[1]));
      const p = args[2] ? args[2].getText() : "{}";
      addImport(sourceFile, "gtagConfig", "@/lib/analytics.compat");
      call.replaceWithText(`gtagConfig(${id}, ${p})`);
      changed = true;
      return;
    }
  });

  if (changed) {
    addImport(sourceFile, "trackEvent", "@/lib/analytics"); // ensures base module gets bundled
  }
  return changed;
}

function walk(dir: string, acc: string[] = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(full, acc);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

const files = walk(SRC);
project.addSourceFilesAtPaths(files);

let edited = 0;
for (const sf of project.getSourceFiles()) {
  const changed = processFile(sf);
  if (changed) edited++;
}

if (edited > 0) project.saveSync();
console.log(`normalize-analytics: updated ${edited} files`);