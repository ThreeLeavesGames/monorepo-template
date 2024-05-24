/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { Image as RNImage, ImageBackground as RNImageBackground, View } from 'react-native';
import RefreshingComponent from '../RefreshingComponent';
// import { IImageHelper, IImageProps, getDimensionsFromStyle } from './interfaces';
// import { ImageLoader, PlaceholderContainer } from './styles';
import { ImageProps, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet } from 'react-native';

export declare type Priority = 'low' | 'normal' | 'high';
export declare type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'center';

export interface IImageProps extends ImageProps {
  children?: React.ReactNode;
  placeholder?: ImageSourcePropType;
  priority?: Priority;
  resizeMode?: ImageResizeMode;
  showLoader?: boolean;
  showPlaceholder?: boolean;
  source: ImageSourcePropType;
}

export interface IImageHelper {
  clearDiskCache: () => Promise<void>;
  clearMemoryCache: () => Promise<void>;
  prefetch: (url: string) => Promise<void>;
}

interface IImageDimensions {
  height: number | string;
  width: number | string;
}

export const getDimensionsFromStyle = (style: StyleProp<ImageStyle>): IImageDimensions => {
  const styles = StyleSheet.flatten(style);
  const height = styles.height || '100%';
  const width = styles.width || '100%';

  return {
    height,
    width,
  };
};

/* Cache */
// TODO: https://github.com/DylanVann/react-native-fast-image/issues/823



// TODO: SKV|26.02.22| Memoize?
const Image: React.FC<IImageProps> = (props): React.ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    placeholder = require('../../assets/placeholder-image.png'),
    resizeMode = 'cover',
    showLoader = false,
    showPlaceholder = false,
    source,
    style = {},
  } = props;

  const dimensions = getDimensionsFromStyle(style);

  const onLoadEnd = () => setIsLoaded(true);

  return (
    <>
      {!isLoaded && (
        <View style={[style, dimensions]}>
          {showPlaceholder && <RNImage style={[style, dimensions]} source={placeholder} resizeMode={'stretch'} />}
          {/* {showLoader && <RefreshingComponent />} */}
        </View>
      )}
      <RNImage
        style={[style, dimensions, isLoaded ? {} : { position: 'absolute', zIndex: -1 }]}
        source={source}
        defaultSource={placeholder}
        resizeMode={resizeMode}
        onLoadEnd={onLoadEnd}
      />
    </>
  );
};

// const ImageBackground: React.FC<IImageProps> = (props): React.ReactElement => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   const {
//     children,
//     placeholder = images.placeholder,
//     resizeMode = 'cover',
//     showLoader = false,
//     showPlaceholder = false,
//     source,
//     style = {},
//   } = props;

//   const dimensions = getDimensionsFromStyle(style);

//   const onLoadEnd = () => setIsLoaded(true);

//   return (
//     <>
//       {!isLoaded && (
//         <PlaceholderContainer style={[style, dimensions]}>
//           {showPlaceholder && (
//             <RNImageBackground style={[style, dimensions]} source={placeholder} resizeMode={'cover'}>
//               {children}
//               {showLoader && <ImageLoader />}
//             </RNImageBackground>
//           )}
//         </PlaceholderContainer>
//       )}
//       <RNImageBackground
//         style={[style, dimensions, isLoaded ? {} : { position: 'absolute', zIndex: -1 }]}
//         source={source}
//         defaultSource={placeholder}
//         resizeMode={resizeMode}
//         onLoadEnd={onLoadEnd}
//       >
//         {children}
//       </RNImageBackground>
//     </>
//   );
// };

const ImageHelper: IImageHelper = {
  prefetch: async (url) => {
    await RNImage.prefetch(url);
  },
  clearDiskCache: async () => {
    // No-op for web
    await Promise.resolve();
  },
  clearMemoryCache: async () => {
    // No-op for web
    await Promise.resolve();
  },
};

export default Image;
// export { Image, ImageBackground, ImageHelper };
