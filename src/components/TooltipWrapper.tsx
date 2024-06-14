import React, { type ReactNode, useState } from 'react';

import {
  type ColorValue,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';

import Tooltip from './Tooltip';
import type { TooltipArrowDirections } from '../Enum';

interface TooltipWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  tooltipPosition: TooltipArrowDirections;
  isTooltipVisible: boolean;
  onCloseTooltip?: () => void;
  title: string;
  description?: string;
  hidePointer?: boolean;
  displayActionButton?: boolean;
  onPressActionButton?: () => void;
  backgroundColor?: ColorValue;
  contentColor?: ColorValue;
  actionButtonColor?: ColorValue;
}

const TooltipWrapper = ({
  children,
  style,
  tooltipPosition,
  isTooltipVisible,
  onCloseTooltip,
  title,
  description,
  hidePointer,
  displayActionButton,
  onPressActionButton,
  backgroundColor,
  contentColor,
  actionButtonColor,
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
        description={description}
        position={tooltipPosition}
        onClose={onCloseTooltip}
        isVisible={isTooltipVisible}
        parentCompDimensions={childrenDimension}
        hidePointer={hidePointer}
        displayActionButton={displayActionButton}
        onPressActionButton={onPressActionButton}
        backgroundColor={backgroundColor}
        contentColor={contentColor}
        actionButtonColor={actionButtonColor}
      />
    </View>
  );
};

export default TooltipWrapper;
