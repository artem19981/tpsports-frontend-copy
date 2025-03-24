// declarations.d.ts
declare module '*.svg?component' {
  import React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
