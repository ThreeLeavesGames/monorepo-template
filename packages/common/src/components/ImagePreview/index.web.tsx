import React, { FC, ReactElement } from 'react';
import { TransformComponent, TransformWrapper } from '@kokarn/react-zoom-pan-pinch';
import { Image, Modal, Pressable, View } from 'react-native';
import Cross from '@forexcot/common/src/assets/Cancel';
import useDimensions from '../../utils/dimentionUtils';
import { themeColors } from '../../constants/constant';

interface IImageType {
  path?: string;
  uri: string;
}

interface IImageProps {
  currentIndex?: number;
  images: Array<IImageType>;
  onCloseModal: () => void;
  visible: boolean;
}

export const ImagePreview: FC<IImageProps> = (props: IImageProps): ReactElement => {
  const { images, visible, onCloseModal, currentIndex } = props;
const {height,width} = useDimensions();
  const imageIndex = images.findIndex((currentImageIndex, index) => {
    if (index === currentIndex) {
      return currentImageIndex;
    }
  });

  const imageUrl = images[imageIndex]?.path ? images[imageIndex]?.path : images[imageIndex]?.uri;

  return (
    <Modal presentationStyle="overFullScreen" animationType="slide" transparent={true} visible={visible}>
      <View style={{flex:1,padding:16,backgroundColor:themeColors.disable}}>
        <Pressable onPress={onCloseModal}>
          <Cross bgColor={'none'} />
        </Pressable>
        <View style={{flex:1,marginHorizontal:16,justifyContent:'center',alignItems:'center',backgroundColor:themeColors.disable}}>
          <TransformWrapper>
            <TransformComponent>
              <Image
              style={{
                width:width - 30,
                height: height - 200
              }}
                source={{
                  uri: imageUrl,
                }}
                resizeMode={'contain'}
              />
            </TransformComponent>
          </TransformWrapper>
        </View>
      </View>
    </Modal>
  );
};
