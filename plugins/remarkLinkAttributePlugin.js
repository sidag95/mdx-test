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
function remarkLinkAttributePlugin(options) {
  // validateOptions(options);
  const { assetsPublicPath, publicPath } = options;

  return (ast) => {
    visit(ast, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'img') {
        const { attributes } = node;
        const srcAttribute = attributes.find(
          (attribute) => attribute.name === 'src'
        );
        if (!srcAttribute) {
          console.error('Image tag requires src attribute');
          // collect error.
        } else {
          const isInternalImage = srcAttribute.value.startsWith('/docs/');
          if (
            isInternalImage &&
            !srcAttribute.value.includes(assetsPublicPath)
          ) {
            srcAttribute.value = srcAttribute.value.replace(
              /^\/docs\//,
              assetsPublicPath
            );
          }
        }
      } else if (node.name === 'a') {
        console.log('mdxJsxFlowElement', node);
        const { attributes } = node;
        const hrefAttribute = attributes.find(
          (attribute) => attribute.name === 'href'
        );
        if (!hrefAttribute) {
          console.error('A tag requires href attribute');
          // collect error.
        } else {
          const isInternalLink = hrefAttribute.value.startsWith('/docs/');
          if (isInternalLink) {
            hrefAttribute.value = hrefAttribute.value.replace(
              /^\/docs\//,
              publicPath
            );
          }
        }
      }
    });
  };
}

export default remarkLinkAttributePlugin;
