/**
 * Prepares notebook cell code for in-browser bundling/eval.
 * - Strips `export` syntax (eval cannot run ES modules)
 * - Auto-calls show() for `export default` React components
 */
export function preprocessCellContent(content: string): string {
  let code = content.trim();
  if (!code) return code;

  let defaultExportName: string | null = null;

  const defaultFunctionMatch = code.match(
    /export\s+default\s+function\s+(\w+)/
  );
  if (defaultFunctionMatch) {
    defaultExportName = defaultFunctionMatch[1];
    code = code.replace(/export\s+default\s+function/, 'function');
  }

  const defaultClassMatch = code.match(/export\s+default\s+class\s+(\w+)/);
  if (defaultClassMatch) {
    defaultExportName = defaultClassMatch[1];
    code = code.replace(/export\s+default\s+class/, 'class');
  }

  const defaultIdentifierMatch = code.match(
    /export\s+default\s+(\w+)\s*;?\s*$/
  );
  if (!defaultExportName && defaultIdentifierMatch) {
    defaultExportName = defaultIdentifierMatch[1];
    code = code.replace(/export\s+default\s+(\w+)\s*;?\s*$/, '');
  }

  code = code.replace(/^export\s+(?=function|const|let|var|class)/gm, '');

  const hasShowCall = /\bshow\s*\(/.test(code);
  if (!hasShowCall && defaultExportName) {
    code += `\n\nshow(<${defaultExportName} />);`;
  }

  return code;
}
