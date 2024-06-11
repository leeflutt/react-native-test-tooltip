import React, { type ReactNode, useState } from 'react';

import { type StyleProp, View, type ViewStyle } from 'react-native';

import Tooltip from './Tooltip';
import { TooltipArrowDirections } from '../Enum';

interface TooltipWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  tooltipPosition: TooltipArrowDirections;
  isTooltipVisible: boolean;
  onCloseTooltip?: () => void;
  title: string;
  content?: string;
  hidePointer?: boolean;
  displayActionButton?: boolean;
  onPressActionButton?: () => void;
}

const TooltipWrapper = ({
  children,
  style,
  tooltipPosition,
  isTooltipVisible,
  onCloseTooltip,
  title,
  content,
  hidePointer,
  displayActionButton,
  onPressActionButton,
}: TooltipWrapperProps) => {
  const [childrenDimension, setChildrenDimension] = useState({
    height: 0,
    width: 0,
  });

  return (
    <View
      style={style && style}
      onLayout={(e) => {
        setChildrenDimension({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        });
      }}
    >
      {children}
      <Tooltip
        title={title}
        content={content}
        position={tooltipPosition}
        onClose={onCloseTooltip}
        isVisible={isTooltipVisible}
        parentCompDimensions={childrenDimension}
        hidePointer={hidePointer}
        displayActionButton={displayActionButton}
        onPressActionButton={onPressActionButton}
      />
    </View>
  );
};

export default TooltipWrapper;
