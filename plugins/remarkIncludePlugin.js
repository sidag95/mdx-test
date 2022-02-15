import path from 'path';
import { visit } from 'unist-util-visit';
// import titleCase from 'lodash.startscase';

// export interface RemarkMdxImagesOptions {
//   /**
//    * By default imports are resolved relative to the markdown file. This matches default markdown
//    * behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed.
//    * This allows to import images from `node_modules`. If this is disabled, local images can still
//    * be imported by prepending the path with `./`.
//    *
//    * @default true
//    */
//   resolve?: boolean;
// }

// eslint-disable-next-line unicorn/no-unsafe-regex
const BLOCK_RULES_REGEX = /^@include(.*)$/;
const REPLACE_PATTERN = /[/-]/;

/**
 * A Remark plugin for converting Markdown images to MDX images using imports for the image source.
 */
function remarkIncludePlugin(options) {
  // validateOptions(options);
  const { partialFolderPath } = options;

  return (ast, file) => {
    const currentFileAbsolutePath = file.history[0];
    const currentFileDirectory = path.dirname(currentFileAbsolutePath);
    const imports = [];
    const imported = new Map();

    visit(ast, 'paragraph', (node, index, parent) => {
      const { children } = node;
      const childValue = children.length === 1 ? children[0].value : null;
      const isPartialImport = childValue && childValue.match(BLOCK_RULES_REGEX);

      if (isPartialImport && isPartialImport.length) {
        const importPath = isPartialImport[1]?.trim();
        const partialAbsolutePath = path.join(partialFolderPath, importPath);
        const relativeImportDirectory = path.relative(
          currentFileDirectory,
          partialAbsolutePath
        );
        const relativeImportPath = path.join(
          relativeImportDirectory,
          'index.md'
        );
        if (!importPath) {
          console.error(new Error(`@include path not defined`));
        } else {
          let namedImport = imported.get(importPath);
          if (!namedImport) {
            namedImport = importPath
              .replace(REPLACE_PATTERN, '_')
              .toUpperCase();
            console.log('New Named Import', namedImport, relativeImportPath);
            imports.push({
              type: 'mdxjsEsm',
              data: {
                estree: {
                  type: 'Program',
                  sourceType: 'module',
                  body: [
                    {
                      type: 'ImportDeclaration',
                      source: {
                        type: 'Literal',
                        value: relativeImportPath,
                        raw: JSON.stringify(relativeImportPath),
                      },
                      specifiers: [
                        {
                          type: 'ImportDefaultSpecifier',
                          local: { type: 'Identifier', name: namedImport },
                        },
                      ],
                    },
                  ],
                },
              },
            });
            imported.set(importPath, namedImport);
            const textElement = {
              type: 'mdxJsxTextElement',
              name: `${namedImport}`,
              children: [],
              attributes: [],
            };
            parent.children.splice(index, 1, textElement);
          }
        }
      }
    });

    // visit(ast, 'mdxJsxFlowElement', (node) => {
    //   console.log('mdxJsxFlowElement', node);
    // });

    ast.children.unshift(...imports);
  };
}

export default remarkIncludePlugin;
