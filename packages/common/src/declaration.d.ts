// declare module '*.svg' {
//     import React from 'react';
//     import { SvgProps } from 'react-native-svg';
//     const content: React.FC<SvgProps>;
//     export default content;
// }

declare module 'cheerio'

declare module 'react-native-cheerio'

declare module 'react-native-svg' {
    import { ComponentType } from 'react';
  
    export const Svg: ComponentType<any>;
    export const Circle: ComponentType<any>;
    export const Path: ComponentType<any>;
    // Add declarations for other SVG components if needed
  }
  