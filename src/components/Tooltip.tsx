import React, { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  type ColorValue,
} from 'react-native';

import type { TooltipArrowDirections } from '../Enum';

interface TooltipProps {
  title: string;
  description?: string;
  position: TooltipArrowDirections;
  onClose?: () => void;
  isVisible: boolean;
  parentCompDimensions: { height: number; width: number };
  hidePointer?: boolean;
  displayActionButton?: boolean;
  onPressActionButton?: () => void;
  backgroundColor?: ColorValue;
  contentColor?: ColorValue;
  actionButtonColor?: ColorValue;
}

interface PointerPosition {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface TooltipPosition {
  tLeft?: number;
  tTop: number;
}

interface Position {
  pointerPosition: PointerPosition;
  tooltipPosition: TooltipPosition;
}

const pointerSize = 16;
const rotatePointerDelta = 3;
const pointerMargin = 4;

const Tooltip = ({
  title,
  description,
  position,
  onClose,
  isVisible,
  hidePointer,
  parentCompDimensions,
  displayActionButton,
  onPressActionButton,
  backgroundColor,
  contentColor,
  actionButtonColor,
}: TooltipProps) => {
  const [tooltipDimensions, setTooltipDimensions] = useState({
    width: 0,
    height: 0,
  });
  const positionValues: Record<TooltipArrowDirections, Position> = {
    ['RIGHT']: {
      pointerPosition: {
        left: -(pointerSize / 2 - rotatePointerDelta),
        top: 16,
      },
      tooltipPosition: {
        tLeft: parentCompDimensions.width + pointerSize / 2 + pointerMargin,
        tTop: -(
          pointerSize +
          rotatePointerDelta +
          pointerMargin -
          parentCompDimensions.height / 2
        ),
      },
    },
    ['LEFT']: {
      pointerPosition: {
        right: -(pointerSize / 2 - rotatePointerDelta),
        top: 16,
      },
      tooltipPosition: {
        tLeft: -(tooltipDimensions.width + pointerSize / 2 + pointerMargin),
        tTop: -(
          pointerSize +
          rotatePointerDelta +
          pointerMargin -
          parentCompDimensions.height / 2
        ),
      },
    },
    ['TOP_LEFT']: {
      pointerPosition: { right: 16, bottom: -(pointerSize / 2) },
      tooltipPosition: {
        tTop: -(
          tooltipDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin
        ),
      },
    },
    ['TOP_CENTER']: {
      pointerPosition: {
        left: tooltipDimensions.width / 2 - pointerSize / 2,
        bottom: -(pointerSize / 2),
      },
      tooltipPosition: {
        tTop: -(
          tooltipDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin
        ),
      },
    },
    ['TOP_RIGHT']: {
      pointerPosition: { left: 16, bottom: -(pointerSize / 2) },
      tooltipPosition: {
        tTop: -(
          tooltipDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin
        ),
      },
    },
    ['BOTTOM_LEFT']: {
      pointerPosition: { right: 16, top: -(pointerSize / 2) },
      tooltipPosition: {
        tTop:
          parentCompDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin,
      },
    },
    ['BOTTOM_CENTER']: {
      pointerPosition: {
        left: tooltipDimensions.width / 2 - pointerSize / 2,
        top: -(pointerSize / 2),
      },
      tooltipPosition: {
        tTop:
          parentCompDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin,
      },
    },
    ['BOTTOM_RIGHT']: {
      pointerPosition: { left: 16, top: -(pointerSize / 2) },
      tooltipPosition: {
        tTop:
          parentCompDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin,
      },
    },
  };

  const { pointerPosition, tooltipPosition } = positionValues[position] || {};
  const onLeft = position === 'BOTTOM_LEFT' || position === 'TOP_LEFT';
  const onRight = position === 'BOTTOM_RIGHT' || position === 'TOP_RIGHT';
  const [numberOfLines, setNumberOfLines] = useState(0);

  return isVisible ? (
    <View
      style={[
        styles.globalContainer,
        {
          top: tooltipPosition.tTop,
          left: tooltipPosition.tLeft,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            marginLeft: onLeft ? -150 : 'auto',
            marginRight: onRight ? -150 : 'auto',
            backgroundColor: backgroundColor || '#FFFFFF',
          },
        ]}
        onLayout={(e) => {
          setTooltipDimensions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          });
        }}
      >
        <View
          style={[
            styles.titleContainer,
            { alignItems: numberOfLines > 1 ? 'flex-start' : 'center' },
          ]}
        >
          <Text
            style={[
              styles.title,
              !onClose && { flex: 1, textAlign: 'center' },
              { color: contentColor || '#000000' },
            ]}
            numberOfLines={2}
            onTextLayout={(e) => setNumberOfLines(e.nativeEvent.lines.length)}
          >
            {title}
          </Text>
          {onClose && (
            <Pressable
              style={{ marginLeft: 8 }}
              onPress={onClose}
              hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            >
              <Image
                source={{
                  uri: 'https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png',
                }}
                style={{ height: 18, width: 18 }}
                tintColor={contentColor || '#000000'}
              />
            </Pressable>
          )}
        </View>
        {description && (
          <Text style={{ color: contentColor || '#000000' }} numberOfLines={2}>
            {description}
          </Text>
        )}
        {displayActionButton && (
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginTop: 10 }}
            onPress={onPressActionButton}
          >
            <Text
              style={{
                color: actionButtonColor || '#003DB0',
                fontWeight: 'bold',
              }}
            >
              Action
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!hidePointer && (
        <View
          style={[
            styles.pointer,
            {
              bottom: pointerPosition.bottom,
              top: pointerPosition.top,
              left: pointerPosition.left,
              right: pointerPosition.right,
              backgroundColor: backgroundColor || '#FFFFFF',
            },
          ]}
        />
      )}
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    maxWidth: 270,
    padding: 12,
    borderRadius: 6,
    zIndex: 1000,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  pointer: {
    height: pointerSize,
    width: pointerSize,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    elevation: 3,
    zIndex: 900,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  globalContainer: {
    zIndex: 1000,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 0.1,
    borderColor: 'transparent',
    borderRadius: 6,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});

export default Tooltip;
