import React, { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { TooltipArrowDirections } from '../Enum';

interface TooltipProps {
  title: string;
  content?: string;
  position: TooltipArrowDirections;
  onClose?: () => void;
  isVisible: boolean;
  parentCompDimensions: { height: number; width: number };
  hidePointer?: boolean;
  displayActionButton?: boolean;
  onPressActionButton?: () => void;
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
  content,
  position,
  onClose,
  isVisible,
  hidePointer,
  parentCompDimensions,
  displayActionButton,
  onPressActionButton,
}: TooltipProps) => {
  const [tooltipDimensions, setTooltipDimensions] = useState({
    width: 0,
    height: 0,
  });
  const positionValues: Record<TooltipArrowDirections, Position> = {
    [TooltipArrowDirections.RIGHT]: {
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
    [TooltipArrowDirections.LEFT]: {
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
    [TooltipArrowDirections.TOP_LEFT]: {
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
    [TooltipArrowDirections.TOP_CENTER]: {
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
    [TooltipArrowDirections.TOP_RIGHT]: {
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
    [TooltipArrowDirections.BOTTOM_LEFT]: {
      pointerPosition: { right: 16, top: -(pointerSize / 2) },
      tooltipPosition: {
        tTop:
          parentCompDimensions.height +
          pointerSize / 2 +
          rotatePointerDelta +
          pointerMargin,
      },
    },
    [TooltipArrowDirections.BOTTOM_CENTER]: {
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
    [TooltipArrowDirections.BOTTOM_RIGHT]: {
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
  const onLeft =
    position === TooltipArrowDirections.BOTTOM_LEFT ||
    position === TooltipArrowDirections.TOP_LEFT;
  const onRight =
    position === TooltipArrowDirections.BOTTOM_RIGHT ||
    position === TooltipArrowDirections.TOP_RIGHT;
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
            style={[styles.title, !onClose && { flex: 1, textAlign: 'center' }]}
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
              />
            </Pressable>
          )}
        </View>
        {content && (
          <Text style={{ color: 'black' }} numberOfLines={2}>
            {content}
          </Text>
        )}
        {displayActionButton && (
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginTop: 10 }}
            onPress={onPressActionButton}
          >
            <Text style={{ color: '#003DB0', fontWeight: 'bold' }}>Action</Text>
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
    backgroundColor: 'white',
    minWidth: 200,
    maxWidth: 270,
    padding: 12,
    borderRadius: 6,
    zIndex: 1000,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    flexShrink: 1,
  },
  pointer: {
    backgroundColor: 'white',
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
